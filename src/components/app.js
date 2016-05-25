import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';


export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/" className="text-center">
          <AppBar title='Truth'/>
        </Link>
        {this.props.children}
      </div>
    );
  }
}
