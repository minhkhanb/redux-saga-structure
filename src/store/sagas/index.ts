import { put, takeEvery, all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* helloSaga() {
  console.log('Hello Sagas!');
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    helloSaga(),
    watchIncrementAsync()
  ]);
}