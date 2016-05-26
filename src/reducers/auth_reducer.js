import { AUTH_USER, UNAUTH_USER, AUTH_ERROR_LOGIN, AUTH_ERROR_SIGNUP } from '../actions/index';

export default function(state= {}, action) {
  switch(action.type) {
    case AUTH_USER:
    //need to add user object to state
      return { ...state, loginError: '', signupError: '', authenticated: true};
    case UNAUTH_USER:
      return { ...state, authenticated: true};
    case AUTH_ERROR_LOGIN:
      return { ...state, loginError: action.payload};
    case AUTH_ERROR_SIGNUP:
      return { ...state, signupError: action.payload};
    default:
      return state
  }
}