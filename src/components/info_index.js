import React, { Component } from 'react';
import LoginHeader from './auth/login_header.js';
import Header from './header.js';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

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
    const style = {
      height: 700
    };
    return (
      <div>
        {this.renderHeader()}
        <div>
          <Paper style={style} zDepth={4} >
            <h2>What is Truth?</h2>
            <p>It's love</p>
            <p>It's life</p>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(InfoIndex);