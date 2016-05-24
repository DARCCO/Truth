import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: UserReducer,
  auth: AuthReducer
});

export default rootReducer;
