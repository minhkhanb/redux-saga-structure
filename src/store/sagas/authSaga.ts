import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { getGithubRepos } from '@src/services';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* fetchGithubRepos() {
  try {
    const { data } = yield call(getGithubRepos);

    console.log('data: ', data);

    yield put({ type: 'USER_FETCH_SUCCEEDED', repos: data });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: (e as any).message });
  }
}

function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

function* authSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
  yield takeLatest('USER_FETCH_REQUESTED', fetchGithubRepos);
}

export default authSaga;