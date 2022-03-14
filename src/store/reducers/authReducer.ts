interface Repos {
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

const authReducer = (state: AuthState = authState, action: any) => {
  switch (action.type) {
    case 'USER_FETCH_SUCCEEDED':
      return {
        ...state,
        repos: action.repos,
      };

    case 'INCREMENT':
      return {
        ...state,
        times: state.times + 1,
      };

    case 'DECREMENT':
      return {
        ...state,
        times: state.times - 1,
      };

    default:
      return state;
  }
};

export default authReducer;