import { applyMiddleware, compose, createStore } from 'redux';
import reduxWebsocket from '@giantmachines/redux-websocket';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/rootSaga';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxWebsocketMiddleware = reduxWebsocket();
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store.
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(reduxWebsocketMiddleware, sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
