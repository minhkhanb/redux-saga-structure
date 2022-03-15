import { Repos } from '@src/store/reducers/authReducer';
import * as actions from '@src/store/actionTypes/auth';

export const fetchGithubReposRequested = (): actions.FetchGithubReposRequestedAction => ({
  type: actions.FETCH_GITHUB_REPOS_REQUESTED,
});

interface FetchGithubReposSuccessPayload {
  repos: Repos[];
}

export const fetchGithubReposSuccess = (payload: FetchGithubReposSuccessPayload): actions.FetchGithubReposSuccessAction => ({
  type: actions.FETCH_GITHUB_REPOS_SUCCESS,
  repos: payload.repos,
});

interface FetchGithubReposFailedPayload {
  error: Error | string | unknown;
}

export const fetchGithubReposFailed = (payload: FetchGithubReposFailedPayload): actions.FetchGithubReposFailedAction => ({
  type: actions.FETCH_GITHUB_REPOS_FAILED,
  error: payload.error,
});