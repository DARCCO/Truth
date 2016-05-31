import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/index';
import { ADD_CREATED_POLL } from './actions/index';
import * as actions from './actions/index';
import io from 'socket.io-client';

import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, purple500, pink500, purpleA400} from 'material-ui/styles/colors';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

var socket = io();

socket.on('createpoll', function(data) {
  console.log('data createpoll socket.on:', data);
  store.dispatch(actions.addCreatedPoll(data));
});

socket.on('pendingpoll', function(data) {
  console.log('data pending poll socket', data);
  store.dispatch(actions.updateResultsPolls(data));
});

socket.on('resultspoll', function(data) {
  console.log('data results poll socket', data);
  store.dispatch(actions.updatePendingPolls(data));
});

const muiTheme = getMuiTheme({
  palette: {
   primary1Color: '#394264',
   primary2Color: green500,
   //accent1Color: green500
  },
  appBar: {
    height: 110,
  },
  fontFamily: 'Open Sans Condensed'
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));