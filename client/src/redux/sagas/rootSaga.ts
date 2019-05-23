import { all } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { webSocketSaga } from './webSocketSaga';

export function* rootSaga() {
  yield all([
    userSaga(),
    webSocketSaga(),
  ]);
}
