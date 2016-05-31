import axios from 'axios';
import { browserHistory } from 'react-router';

export const FETCH_POLLS = 'FETCH_POLLS';
export const CREATE_POLL = 'CREATE_POLL';
export const DELETE_PENDING_POLL = 'DELETE_PENDING_POLL';
export const DELETE_RESULTS_POLL = 'DELETE_RESULTS_POLL';
export const ADD_CREATED_POLL = 'ADD_CREATED_POLL';
export const UPDATE_RESULTS_POLLS = 'UPDATE_RESULTS_POLLS';
export const UPDATE_PENDING_POLLS= 'UPDATE_PENDING_POLLS';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export function loginUser({ username, password }) {
  return function(dispatch) {
    axios.post('/signin', { username, password })
      .then( response => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/pendingpolls');
      })
      .catch(() => {
        dispatch(authError('Incorrect Login Information'));
        console.log(response.data);
      });
  }
}

export function signupUser({ username, password }) {
  return function(dispatch) {
    axios.post('/signup', { username, password })
      .then( response => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/pendingpolls');
      })
      .catch((response) => {
        dispatch(authError(response.data.error));
        console.log(response.data);
      });
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function deletePendingPoll(info) {
  return function(dispatch) {
    axios.post('/pendingpolls', info, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: DELETE_PENDING_POLL,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response.data);
      });
  }
}

export function deleteResultsPoll(pollId) {
  return function(dispatch) {
    axios.post('/resultspolls', { pollId }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: DELETE_RESULTS_POLL,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response.data);
      });
  }
}

export function createPoll(props) {
  return function(dispatch) {
    axios.post('/createpoll', props, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: CREATE_POLL,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response.data);
      });
  }
}

export function addCreatedPoll(data) {
  return {
    type: ADD_CREATED_POLL,
    payload: data
  };
}

export function updateResultsPolls(data) {
  return {
    type: UPDATE_RESULTS_POLLS,
    payload: data
  }
}

export function updatePendingPolls(data) {
  return {
    type: UPDATE_PENDING_POLLS,
    payload: data
  }
}