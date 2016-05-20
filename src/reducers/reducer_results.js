import { FETCH_POLLS } from '../actions/index';
import { DELETE_POLL } from '../actions/index';
import { CREATE_POLL } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POLLS:
      return { ...state, all: action.payload.data };
    case DELETE_POLL:
      //TO BE UPDATED
      return state;
    default:
      return state;
  }
}