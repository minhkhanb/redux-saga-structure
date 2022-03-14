import { Repos } from '@src/store/reducers/authReducer';
import * as actions from '@src/store/actionTypes/auth';

interface GithubReposSuccessPayload {
  repos: Repos[];
}

export const fetchGithubReposSuccess = (payload: GithubReposSuccessPayload): actions.FetchGithubReposSuccessAction => ({
  type: actions.FETCH_GITHUB_REPOS_SUCCESS,
  repos: payload.repos,
})