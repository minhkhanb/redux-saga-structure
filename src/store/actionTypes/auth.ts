import { Repos } from '@src/store/reducers/authReducer';

export const FETCH_GITHUB_REPOS_SUCCESS = '@@auth/FETCH_GITHUB_REPOS_SUCCESS';
export interface FetchGithubReposSuccessAction {
  type: typeof FETCH_GITHUB_REPOS_SUCCESS;
  repos: Repos[];
}

export type AuthAction = FetchGithubReposSuccessAction;