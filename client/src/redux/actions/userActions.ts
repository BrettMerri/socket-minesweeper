export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequestAction = () => ({
  type: LOGIN_REQUEST,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccessAction = (userId: string) => ({
  type: LOGIN_SUCCESS,
  payload: {
    userId,
  },
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginErrorAction = (errorMessage: string) => ({
  type: LOGIN_ERROR,
  payload: {
    errorMessage,
  },
});
