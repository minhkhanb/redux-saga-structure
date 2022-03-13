import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import authReducer from './reducers/authReducer';
import authSaga from './sagas/authSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  authReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(authSaga);

export const dispatch = (action: any) => store.dispatch(action);

export default store;

