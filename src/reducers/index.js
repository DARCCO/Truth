import { combineReducers } from 'redux';
import PendingReducer from './reducer_pending';
import ResultsReducer from './reducer_results';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  pendingPolls: PendingReducer,
  resultsPolls: ResultsReducer,
  form: formReducer
});

export default rootReducer;
