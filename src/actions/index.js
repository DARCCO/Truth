import axios from 'axios';

export const FETCH_POLLS = 'FETCH_POLLS';
export const CREATE_POLL = 'CREATE_POLL';
export const DELETE_POLL = 'DELETE_POLL';

export function fetchPolls() {
  const request = null //axios request

  return {
    type: FETCH_POLLS,
    payload: request
  };
}

export function deletePoll(poll) {
  const request = null //axios request

  return {
    type: DELETE_POLL,
    payload: poll
  }
}

export function createPoll(props) {
  const request = null //axios request

  return {
    type: CREATE_POLL,
    payload: request
  };
}