import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCreatedPoll } from '../actions/index';

export default class App extends Component {

  render() {
    const styles= {
      fontSize: '70px'
    };

    return (
      <div>
        <Link to="/" className="text-center">
          <AppBar titleStyle= {styles} showMenuIconButton= {false} title='Truth'/>
        </Link>
        {this.props.children}
      </div>
    );
  }
}


