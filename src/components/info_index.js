import React, { Component } from 'react';
import LoginHeader from './auth/login_header.js';
import Header from './header.js';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class InfoIndex extends Component {
  renderHeader() {
    if (this.props.authenticated){
      return <Header value= {6} />
    }
    else{
      return <LoginHeader value= {7}  />
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