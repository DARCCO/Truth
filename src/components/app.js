import React, { Component } from 'react';
import { Link } from 'react-router';

var socket = io();
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
socket.on('createpoll', function(data) {
  console.log('data createpoll socket.on:', data);
});

export default class App extends Component {

  render() {
    return (
      <div>
        <Link to="/" className="text-center">
          <h1>Truth</h1>
        </Link>
        {this.props.children}
      </div>
    );
  }
}
