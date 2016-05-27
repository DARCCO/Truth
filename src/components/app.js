import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCreatedPoll } from '../actions/index';

export default class App extends Component {

  render() {

    return (
      <div>
        <Link to="/" className="text-center">
          <AppBar showMenuIconButton= {false} title='Truth'/>
        </Link>
        {this.props.children}
      </div>
    );
  }
}


