import React, { Component } from 'react';
import LoginHeader from './auth/login_header.js';
import Header from './header.js';
import { connect } from 'react-redux';

class InfoIndex extends Component {
  renderHeader() {
    if (this.props.authenticated){
      return <Header />
    }
    else{
      return <LoginHeader />
    }
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        <div>
          <h2>What is Truth?</h2>
          <p>It's love</p>
          <p>It's life</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(InfoIndex);