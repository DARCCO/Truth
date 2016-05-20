import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/" className="text-center">
          <h1>Truth</h1>
        </Link>
        <div>
          <Link to="/pendingpolls" className="col-md-3 btn btn-primary">
            Pending Polls
          </Link>
          <Link to="/resultspolls" className="col-md-3 btn btn-primary">
            Results Polls
          </Link>
          <Link to="/createpoll" className="col-md-3 btn btn-primary">
            Create Poll
          </Link>
          <Link to="/logout" className="col-md-3 btn btn-primary">
            Logout
          </Link>
          </div>
        {this.props.children}
      </div>
    );
  }
}
