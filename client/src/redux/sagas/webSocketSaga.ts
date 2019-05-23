import { all, takeEvery, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { gameStartedAction, updateCellValuesAction } from '../actions/boardActions';
import { REDUX_WEBSOCKET_MESSAGE } from '../actions/reduxWebSocketActions';

interface WebSocketResponse {
  type: string;
  payload?: {
    [key: string]: any;
  };
}

function* handleReduxWebSocketMessage(action: AnyAction) {
  const message: WebSocketResponse = JSON.parse(action.payload.message);
  console.log(message);

  switch (message.type) {
    case 'GAME_STARTED':
      const {
        width,
        height,
        mineCount,
      } = message.payload!;

      return yield put(gameStartedAction(width, height, mineCount));

    case 'UPDATE_CELL_VALUES':
      const {
        diff,
      } = message.payload!;

      return yield put(updateCellValuesAction(diff))
  }
}

function* watchReduxWebSocketMessage() {
  yield takeEvery(REDUX_WEBSOCKET_MESSAGE, handleReduxWebSocketMessage);
}

export function* webSocketSaga() {
  yield all([
    watchReduxWebSocketMessage(),
  ]);
}
