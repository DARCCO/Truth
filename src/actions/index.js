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
export const AUTH_ERROR_LOGIN = 'AUTH_ERROR_LOGIN';
export const AUTH_ERROR_SIGNUP = 'AUTH_ERROR_SIGNUP';

export function loginUser({ username, password }) {
  return function(dispatch) {
    axios.post('/login', {username: username, password: password})
    .then( response => {
      //need to add payload to AUTH_USER dispatch that contains user object
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/pendingpolls');
    })
    .catch(() => {
      dispatch(authErrorLogin('Username and/or Password does not exist'));
    });
  }
}

export function signUpUser({ username, password }) {
  return function(dispatch) {
    axios.post('/signup', { username, password })
    .then( response => {
      //need to add payload to AUTH_USER dispatch that contains user object
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/pendingpolls');
    })
    .catch(() => {
      dispatch(authErrorSignup(response.data.error));
    });
  }
}

export function logoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function authErrorLogin(error) {
  return {
    type: AUTH_ERROR_LOGIN,
    payload: error
  }
}

export function authErrorSignup(error) {
  return {
    type: AUTH_ERROR_SIGNUP,
    payload: error
  }
}

export function fetchPolls() {
  const request = axios.get('/polls', {
    headers: {authorization: localStorage.getItem('token') }
  }) //axios request

  return {
    type: FETCH_POLLS,
    payload: request
  };
}

export function deletePendingPoll(pollId) {
  axios.post('/pendingpolls', pollId, {
    headers: {authorization: localStorage.getItem('token') }
  })
  .then(function(res){
    console.log(res);
  }).catch(function(err){
    console.error(err);
  });
  //axios.post('/pendingpolls', {pendingPoll: 'testing axios pending poll'});

  return {
    type: DELETE_PENDING_POLL,
    payload: pollId
  };
}

export function deleteResultsPoll(pollId) {
  axios.delete('/resultspolls', pollId, {
    headers: {authorization: localStorage.getItem('token') }
  })
  .then(function(res){
    console.log(res);
  }).catch(function(err){
    console.error(err);
  });

  //axios.delete('/resultspolls', {resultsPoll: 'testing axios results poll'});

  return {
    type: DELETE_RESULTS_POLL,
    payload: pollId
  };

}

export function createPoll(props) {
  //POST request must include JWT authorization in headers-- see other action creators for examples
  //const request = null //axios request
  // {
  //   headers: {authorization: localStorage.getItem('token') }
  // }
  console.log('inside createpoll action creator');
  const request = null;
  axios.post('/createPoll', {createPoll: 'testing axios post create poll'});
  return {
    type: CREATE_POLL,
    payload: request
  };
}

export function addCreatedPoll(data) {
  //console.log('inside AddCreatedPoll');
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