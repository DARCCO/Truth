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
      console.log('newState in AUTH_USER case inside reducer_user:', newState);
      return newState;
    case UNAUTH_USER:
      var newState = {};
      return newState;
    case FETCH_POLLS:
      console.log('action.payload.data:', action.payload.data);
      // state = action.payload;
      // return state;
      return action.payload;
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
      console.log('Add Created Poll');
      if (state.user.username === action.payload.poll.createdBy){
        var statePendingCopy= Object.assign({}, state.pending);
        statePendingCopy[action.payload.pollId]= action.payload.poll;
        var stateCopy= Object.assign({}, state);
        stateCopy.pending= statePendingCopy;
        console.log(stateCopy);
        return stateCopy;
      }else{
        return state;
      }
    case UPDATE_RESULTS_POLLS:
      if (action.payload.pollId in state.user.created){
        var stateCreatedCopy= Object.assign({}, state.created);
        stateCreatedCopy[action.payload.pollId]= action.payload.poll;
        var stateCopy= Object.assign({}, state);
        stateCopy.created= stateCreatedCopy;
        console.log(stateCopy);
        return stateCopy;
      }else{
        return state;
      }
    case UPDATE_PENDING_POLLS:
      if (action.payload.pollId in state.user.pending){
        var stateCreatedCopy= Object.assign({}, state.created);
        delete stateCreatedCopy[action.payload.pollId]
        var stateCopy= Object.assign({}, state);
        stateCopy.created= stateCreatedCopy;
        console.log(stateCopy);
        return stateCopy;
      }else{
        return state;
      }
    default:
      return state;
  }
}