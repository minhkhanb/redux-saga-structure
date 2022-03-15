import * as actions from '../actionTypes/auth';

export interface Repos {
  [key: string]: string;
}

export interface AuthState {
  repos: Repos[];
  times: number;
}

const authState: AuthState = {
  repos: [],
  times: 0,
};

const authReducer = (state: AuthState = authState, action: actions.AuthAction) => {
  switch (action.type) {
    case actions.FETCH_GITHUB_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.repos,
      };

    default:
      return state;
  }
};

export default authReducer;