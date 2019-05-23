import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
} from '../actions/reduxWebSocketActions';
import { Reducer } from 'redux';

export interface ReduxWebSocketState {
  connecting: boolean;
  connected: boolean;
  lastMessage: string;
}

export const initialState: ReduxWebSocketState = {
  connecting: false,
  connected: false,
  lastMessage: '',
};

const reduxWebSocketReducer: Reducer<ReduxWebSocketState> = (
  state = initialState,
  action,
): ReduxWebSocketState => {
  switch (action.type) {
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        connecting: true,
        connected: false,
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connecting: false,
        connected: true,
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connecting: false,
        connected: false,
      };

    default:
      return state;
  }
};

export default reduxWebSocketReducer;
