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
      });
  }
}

export function signupUser({ username, password }) {
  return function(dispatch) {
    axios.post('/signup', { username, password })
      .then( response => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        console.log('inside signupUser');
        browserHistory.push('/pendingpolls');
      })
      .catch((response) => {
        console.log('inside .catch of signupuser', response);
        dispatch(authError(response.data.error));
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

export function fetchPolls() {
  console.log('fetch polls action creator');
  return function(dispatch) {
    axios.get('/polls', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_POLLS,
          payload: response
        });
      })
      .catch(response => {
        localStorage.removeItem('token');
        browserHistory.push('/login');
      });
  }
  // const request = axios.get('/polls', {
  //   headers: { authorization: localStorage.getItem('token') }
  // }) //axios request

  // return {
  //   type: FETCH_POLLS,
  //   payload: request
  // };
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
        console.log('response.data in .catch deletePendingPoll:', response.data);
      });
  }
  // axios.post('/pendingpolls', pollId, {
  //   headers: {authorization: localStorage.getItem('token') }
  // })
  // .then(function(res){
  //   console.log(res);
  // }).catch(function(err){
  //   console.error(err);
  // });

  // return {
  //   type: DELETE_PENDING_POLL,
  //   payload: pollId
  // };
}

export function deleteResultsPoll(pollId) {
  console.log('pollId:', pollId);
  console.log('inside deleteResultspoll action creator');
  return function(dispatch) {
    axios.post('/resultspolls', { pollId }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log('resp.data in .then', response.data);
        dispatch({
          type: DELETE_RESULTS_POLL,
          payload: response.data
        });
      })
      .catch(response => {
        console.log('response.data in .catch deleteResultsPoll:', response.data);
      });
  }
}

export function createPoll(props) {
  console.log('createpoll props inside action creator', props);
  console.log('props.dataURL', props.dataURL);
  return function(dispatch) {
    console.log('right before axios.post(createpoll)');
    axios.post('/createpoll', props, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log('response.data in .then createPoll:', response.data);
        dispatch({
          type: CREATE_POLL,
          payload: response.data
        });
      })
      .catch(response => {
        console.log('response.data in .catch createPoll:', response.data);
      });
  }
}

export function addCreatedPoll(data) {
  console.log('inside AddCreatedPoll');
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