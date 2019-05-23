import { combineReducers, Reducer } from 'redux';
import reduxWebSocketReducer, { ReduxWebSocketState } from './reduxWebSocketReducer';
import userReducer, { UserState } from './userReducer';
import boardReducer, { BoardState } from './boardReducer';

export interface RootState {
  reduxWebSocket: ReduxWebSocketState;
  user: UserState;
  board: BoardState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  reduxWebSocket: reduxWebSocketReducer,
  user: userReducer,
  board: boardReducer,
});

export default rootReducer;
