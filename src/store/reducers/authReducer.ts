const authReducer = (state: any, action: any) => {
  console.log('authReducer: ', state, action);

  switch (action.type) {
    case 'USER_FETCH_SUCCEEDED':
      return {
        ...state,
        user: action.repos,
      }

    default:
      return state;
  }
}

export default authReducer;