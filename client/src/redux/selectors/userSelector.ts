import { RootState } from '../reducers';
import { UserState } from '../reducers/userReducer';

export const selectUser = (state: RootState): UserState => state.user;

export const selectUserId = (state: RootState): string | null => selectUser(state).userId;
export const selectUserLoggingIn = (state: RootState): boolean => selectUser(state).userLoggingIn;
export const selectUserLoginError = (state: RootState): string | null => selectUser(state).userLoginError;
