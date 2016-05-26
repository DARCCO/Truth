import { FETCH_POLLS } from '../actions/index';
import { DELETE_PENDING_POLL } from '../actions/index';
import { DELETE_RESULTS_POLL } from '../actions/index';
import { CREATE_POLL } from '../actions/index';

const INITIAL_STATE = {

  pending: {
    'drew1': {
    pollId: 'drew54',
    photo: null,
    question: "What should I name my dog?",
    answers: {
      "Blue": 0,
      "Mya": 3,
      "Kali": 3
    }
  },
  'drew2': {
    pollId: 'drew64',
    photo: null,
    question: "What color are my eyes?",
    answers: {
      "Green": 14,
      "Blue": 5,
      "Brown": 7,
      "No": 2
    }
  },
  'chris1': {
    pollId: 'chris1',
    photo: null,
    question: "Should I cut my hair?",
    answers: {
      "Yes": 2,
      "No": 3,
      "What hair?": 8
    }
  }
},

  created: {
  'chris2': {
    pollId: 'chris2',
    photo: null,
    question: "What's my favorite color?",
    answers: {
      "Blue": 8,
      "Red": 13,
      "Green": 3,
      "Black": 5
    }
  },
  'rong1': {
    pollId: 'rong1',
    photo: null,
    question: "Should I fly to the moon?",
    answers: {
      "Damnit Rong": 8,
      "No": 3,
      "Yes": 3,
      "Go away Rong": 17
    }
  },
  'rong2': {
    pollId: 'rong2',
    photo: null,
    question: "What's my favorite youtube video?",
    answers: {
      "He-Man": 7,
      "Rick Roll": 3,
      "Something nasty": 15
    }
  },
   'austin1': {
    pollId: 'austin1',
    photo: null,
    question: "Should I get a tattoo?",
    answers: {
      "Yes": 4,
      "No": 9,
    }
  }
}
}

export default function(state = INITIAL_STATE, action) {

  switch(action.type) {
    case FETCH_POLLS:
      console.log('action.payload.data:', action.payload.data);
      state= action.payload;
      return state;
    case CREATE_POLL:
      console.log('inside create POLL:', action.payload);
      return state;
    case DELETE_PENDING_POLL:
      const statePendingCopy= Object.assign({}, state.pending);
      delete statePendingCopy[action.payload];
      var stateCopy = Object.assign({}, state);
      stateCopy.pending= statePendingCopy;
      return stateCopy;

    case DELETE_RESULTS_POLL:
      const stateCreatedCopy= Object.assign({}, state.created);
      delete stateCreatedCopy[action.payload];
      var stateCopy = Object.assign({}, state);
      stateCopy.created= stateCreatedCopy;
      return stateCopy;

    default:
      return state;
  }
}