import express, { Request, Response } from 'express';
import session from 'express-session';
import ws from 'ws';
import http from 'http';
import { resolve } from 'path';
import uuid from 'uuid/v4';
import Board from './Board';
import { generateBoardDiff } from './utils';

const app = express();

const sessionParser = session({
  saveUninitialized: false,
  secret: 'chicken',
  resave: false,
});

app.use(express.static(resolve('../client/build')));
app.use(sessionParser);

app.post('/login', (req, res) => {
  const id = uuid();

  console.log(`Updating session for user ${id}`);
  req.session!.userId = id;
  res.send({ result: 'OK', message: 'Session updated', userId: id });
});

app.post('/logout', (req, res) => {
  console.log('Destroying session');
  req.session!.destroy(() => {
    res.send({ result: 'OK', message: 'Session detroyed' });
  });
});

app.get('*', (req, res) => res.sendFile(resolve('../client/build/index.html')));

const server = http.createServer(app);

const wss = new ws.Server({
  server,
  verifyClient: (info, done) => {
    sessionParser(info.req as Request, {} as Response, () => {
      done((info.req as Request).session!.userId);
    });
  },
});

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    const request = req as Request;
    const msg = JSON.parse(message.toString());
    console.log(msg);
    switch (msg.type) {
      case 'START_GAME':
        const {
          payload: {
            width,
            height,
            mineCount,
          },
        }: { payload: { width: number; height: number; mineCount: number; } } = msg;

        request.session!.board = new Board(width, height, mineCount);
        return ws.send(JSON.stringify({
          type: 'GAME_STARTED',
          payload: {
            width,
            height,
            mineCount,
          },
        }));

      case 'SELECT_CELL':
        const {
          payload: {
            index,
          },
        }: { payload: { index: number; } } = msg;

        const board: Board = request.session!.board;
        const prevPublicCellValues = board.publicCellValues;
        board.selectCell(index);
        const publicCellValues = board.publicCellValues;

        return ws.send(JSON.stringify({
          type: 'UPDATE_CELL_VALUES',
          payload: {
            diff: generateBoardDiff(prevPublicCellValues, publicCellValues),
          },
        }));
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
