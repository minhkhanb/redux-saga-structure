import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { getGithubRepos } from '@src/services';
import * as actionCreators from '../actionCreators/auth';
import * as actionTypes from '../actionTypes/auth';

const delay = (ms: number) => new Promise<number>(resolve => setTimeout(resolve, ms));

function* fetchGithubRepos() {
  try {
    const { data } = yield call(getGithubRepos);

    yield put(actionCreators.fetchGithubReposSuccess({ repos: data }));
  } catch (error) {
    yield put(actionCreators.fetchGithubReposFailed({ error }));
  }
}

function* increment() {
  yield put({ type: 'INCREMENT' });
}

function* decrement() {
  yield put({ type: 'DECREMENT' });
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  yield delay(3000);
  yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* authSaga() {
  yield all([
    takeEvery('INCREMENT_REQUESTED', increment),
    takeEvery('DECREMENT_REQUESTED', decrement),
    takeEvery('INCREMENT_ASYNC_REQUESTED', incrementAsync),
    takeLatest(actionTypes.FETCH_GITHUB_REPOS_REQUESTED, fetchGithubRepos),
  ]);
}

export default authSaga;