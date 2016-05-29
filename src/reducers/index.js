import { combineReducers } from 'redux';
import user from './reducer_user';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';

const rootReducer = combineReducers({
  form,
  user,
  auth
});

export default rootReducer;
