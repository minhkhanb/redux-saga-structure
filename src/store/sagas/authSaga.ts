import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { getGithubRepos } from '@src/services';

const delay = (ms: number) => new Promise<number>(resolve => setTimeout(resolve, ms));

function* fetchGithubRepos() {
  try {
    const { data } = yield call(getGithubRepos);

    yield put({ type: 'USER_FETCH_SUCCEEDED', repos: data });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: (e as any).message });
  }
}

function* increment() {
  yield put({ type: 'INCREMENT' })
}

function* decrement() {
  yield put({ type: 'DECREMENT' })
}

function* incrementAsync() {
  yield delay(3000)
  yield put({ type: 'INCREMENT' })
}

function* authSaga() {
  yield all([
    takeEvery('INCREMENT_REQUESTED', increment),
    takeEvery('DECREMENT_REQUESTED', decrement),
    takeEvery('INCREMENT_ASYNC_REQUESTED', incrementAsync),
    takeLatest('USER_FETCH_REQUESTED', fetchGithubRepos),
  ])
}

export default authSaga;