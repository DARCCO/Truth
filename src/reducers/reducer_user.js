import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_POLLS,
  DELETE_PENDING_POLL,
  DELETE_RESULTS_POLL,
  CREATE_POLL,
  ADD_CREATED_POLL,
  UPDATE_RESULTS_POLLS,
  UPDATE_PENDING_POLLS
} from '../actions/index';

export default function(state = {}, action) {

  switch(action.type) {
    case AUTH_USER:
      var newState = action.payload || state;
      return newState;
    case UNAUTH_USER:
      var newState = {};
      return newState;
    case CREATE_POLL:
      var stateCopy = Object.assign({}, state);
      var stateCreatedCopy = Object.assign({}, state.created);
      stateCreatedCopy[action.payload.poll["_id"]] = action.payload.poll;
      stateCopy.created = stateCreatedCopy;
      return stateCopy;
    case DELETE_PENDING_POLL:
      var statePendingCopy = Object.assign({}, state.pending);
      delete statePendingCopy[action.payload.id];
      var stateCopy = Object.assign({}, state);
      stateCopy.pending = statePendingCopy;
      return stateCopy;
    case DELETE_RESULTS_POLL:
      var stateCreatedCopy = Object.assign({}, state.created);
      delete stateCreatedCopy[action.payload.id];
      var stateCopy = Object.assign({}, state);
      stateCopy.created = stateCreatedCopy;
      return stateCopy;
    case ADD_CREATED_POLL:
      if (state.username !== action.payload.poll.createdBy){
        var statePendingCopy= Object.assign({}, state.pending);
        statePendingCopy[action.payload.poll["_id"]]= action.payload.poll;
        var stateCopy= Object.assign({}, state);
        stateCopy.pending= statePendingCopy;
        return stateCopy;
      }else{
        return state;
      }
    case UPDATE_RESULTS_POLLS:
      if (action.payload.poll["_id"] in state.created){
        var stateCreatedCopy= Object.assign({}, state.created);
        stateCreatedCopy[action.payload.poll["_id"]]= action.payload.poll;
        var stateCopy= Object.assign({}, state);
        stateCopy.created= stateCreatedCopy;
        return stateCopy;
      }else{
        return state;
      }
    case UPDATE_PENDING_POLLS:
      if (action.payload.id in state.pending){
        var stateCreatedCopy= Object.assign({}, state.pending);
        delete stateCreatedCopy[action.payload.id]
        var stateCopy= Object.assign({}, state);
        stateCopy.pending= stateCreatedCopy;
        return stateCopy;
      }else{
        return state;
      }
    default:
      return state;
  }
}