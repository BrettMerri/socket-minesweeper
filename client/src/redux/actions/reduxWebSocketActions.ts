import {
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  connect,
  disconnect,
  send,
} from '@giantmachines/redux-websocket';

import { WEBSOCKET_PREFIX } from '../../constants';

export const REDUX_WEBSOCKET_BROKEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_BROKEN}`;
export const REDUX_WEBSOCKET_OPEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_OPEN}`;
export const REDUX_WEBSOCKET_CLOSED = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CLOSED}`;
export const REDUX_WEBSOCKET_MESSAGE = `${WEBSOCKET_PREFIX}::${WEBSOCKET_MESSAGE}`;
export const REDUX_WEBSOCKET_CONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CONNECT}`;
export const REDUX_WEBSOCKET_DISCONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_DISCONNECT}`;
export const REDUX_WEBSOCKET_SEND = `${WEBSOCKET_PREFIX}::${WEBSOCKET_SEND}`;

export const webSocketConnectAction = () => connect('ws://localhost:8080');
export const webSocketDisconnectAction = () => disconnect();

export const START_GAME = 'START_GAME';
export const startGameAction = (width: number, height: number, mineCount: number) => send({
  type: START_GAME,
  payload: {
    width,
    height,
    mineCount,
  },
});

export const SELECT_CELL = 'SELECT_CELL';
export const selectCellAction = (index: number) => send({
  type: SELECT_CELL,
  payload: {
    index,
  },
});
