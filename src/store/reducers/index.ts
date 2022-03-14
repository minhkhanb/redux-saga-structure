import { combineReducers } from 'redux';
import authReducer, { AuthState } from '@src/store/reducers/authReducer';

export interface AppState {
  auth: AuthState
}

const rootReducers = combineReducers<AppState>({
  auth: authReducer,
})

export default rootReducers;