import { Repos } from '@src/store/reducers/authReducer';

export const FETCH_GITHUB_REPOS_REQUESTED = '@@auth/FETCH_GITHUB_REPOS_REQUESTED';
export interface FetchGithubReposRequestedAction {
  type: typeof FETCH_GITHUB_REPOS_REQUESTED;
}

export const FETCH_GITHUB_REPOS_SUCCESS = '@@auth/FETCH_GITHUB_REPOS_SUCCESS';
export interface FetchGithubReposSuccessAction {
  type: typeof FETCH_GITHUB_REPOS_SUCCESS;
  repos: Repos[];
}

export const FETCH_GITHUB_REPOS_FAILED = '@@auth/FETCH_GITHUB_REPOS_FAILED';
export interface FetchGithubReposFailedAction {
  type: typeof FETCH_GITHUB_REPOS_FAILED;
  error: Error | string | unknown;
}

export type AuthAction = FetchGithubReposRequestedAction | FetchGithubReposSuccessAction | FetchGithubReposFailedAction;