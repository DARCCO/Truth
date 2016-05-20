import { FETCH_POLLS } from '../actions/index';
import { DELETE_POLL } from '../actions/index';
import { CREATE_POLL } from '../actions/index';

//const INITIAL_STATE = { pendingPolls: [] };

const INITIAL_STATE = {
  drew: {
    photo: null,
    question: "What should I name my dog?",
    answers: {
      "Blue": 0,
      "Mya": 3,
      "Kali": 3
    }
  },
  drew: {
    photo: null,
    question: "What color are my eyes?",
    answers: {
      "Green": 14,
      "Blue": 5,
      "Brown": 7,
      "No": 2
    }
  },
  chris: {
    photo: null,
    question: "Should I cut my hair?",
    answers: {
      "Yes": 2,
      "No": 3,
      "What hair?": 8
    }
  },
  chris: {
    photo: null,
    question: "What's my favorite color?",
    answers: {
      "Blue": 8,
      "Red": 13,
      "Green": 3,
      "Black": 5
    }
  },
  rong: {
    photo: null,
    question: "Should I fly to the moon?",
    answers: {
      "Damnit Rong": 8,
      "No": 3,
      "Yes": 3,
      "Go away Rong": 17
    }
  },
  rong: {
    photo: null,
    question: "What's my favorite youtube video?",
    answers: {
      "He-Man": 7,
      "Rick Roll": 3,
      "Something nasty": 15
    }
  },
  austin: {
    photo: null,
    question: "Should I get a tattoo?",
    answers: {
      "Yes": 4,
      "No": 9,
    }
  },
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POLLS:
      console.log('action.payload.data:', action.payload.data);
      return state;
    case DELETE_POLL:
      //TO BE UPDATED
      return state;
    default:
      return state;
  }
}