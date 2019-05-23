import { RootState } from '../reducers';
import { ReduxWebSocketState } from '../reducers/reduxWebSocketReducer';

export const selectReduxWebSocket = (state: RootState): ReduxWebSocketState => state.reduxWebSocket;

export const selectReduxWebSocketConnected = (state: RootState): boolean => selectReduxWebSocket(state).connected;
export const selectReduxWebSocketConnecting = (state: RootState): boolean => selectReduxWebSocket(state).connecting;
export const selectReduxWebSocketLastMessage = (state: RootState): string => selectReduxWebSocket(state).lastMessage;
