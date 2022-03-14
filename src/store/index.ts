import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, logger),
);

const store = createStore(rootReducers, {}, enhancer);

sagaMiddleware.run(rootSaga);

export const dispatch = (action: any) => store.dispatch(action);

export default store;

