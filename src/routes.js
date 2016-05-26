import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import InfoIndex from './components/info_index';
import CreatePoll from './components/create_poll';
import PendingPolls from './components/pending_polls';
import ResultsPolls from './components/results_polls';
import Login from './components/auth/login.js';
import Signup from './components/auth/signup.js';
import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={InfoIndex} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="createpoll" component={CreatePoll} />
    <Route path="pendingpolls" component={PendingPolls} />
    <Route path="resultspolls" component={ResultsPolls} />
  </Route>
)