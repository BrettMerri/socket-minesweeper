import { takeEvery, all, call, put } from 'redux-saga/effects';
import { loginSuccessAction, loginErrorAction } from '../actions/userActions';

function* handleLoginRequest() {
  try {
    const loginResponse: Response = yield call(fetch, 'http://localhost:8080/login', {
      method: 'POST',
    });
    const loginResponseData = yield call([loginResponse, loginResponse.json]);

    yield put(loginSuccessAction(loginResponseData.userId));
  } catch (error) {
    yield put(loginErrorAction(error.message));
  }
}

function* watchLoginRequest() {
  yield takeEvery('LOGIN_REQUEST', handleLoginRequest);
}

export function* userSaga() {
  yield all([
    watchLoginRequest(),
  ]);
}
