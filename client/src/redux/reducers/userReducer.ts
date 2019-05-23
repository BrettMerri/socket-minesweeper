import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../actions/userActions';
import { Reducer } from 'redux';

export interface UserState {
  userId: string | null;
  userLoggingIn: boolean;
  userLoginError: string | null;
}

export const initialState: UserState = {
  userId: null,
  userLoggingIn: false,
  userLoginError: null,
};

const userReducer: Reducer<UserState> = (
  state = initialState,
  action,
): UserState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        userLoggingIn: true,
        userLoginError: null,
        userId: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userLoggingIn: false,
        userLoginError: null,
        userId: action.payload.userId,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        userLoggingIn: false,
        userLoginError: action.payload.errorMessage,
        userId: null,
      };

    default:
      return state;
  }
};

export default userReducer;
