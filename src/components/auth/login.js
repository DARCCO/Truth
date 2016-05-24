import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import * as actions from '../../actions';

class Login extends Component {
  handleFormSubmit({username, password}) {
    this.props.loginUser({ username, password });
    console.log(username, password);
  }
  renderErrorAlert(){
    if (this.props.errorMessage){
      return (
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
        );
    }
  }
  render() {
    const { handleSubmit, fields: { username, password } }= this.props;
    return (
      <div>
      <form onSubmit= {handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className= 'form-group'>
        <label>Username:</label>
        <input {...username} className= 'form-control'/>
      </fieldset>
      <fieldset className= 'form-group'>
        <label>Password:</label>
        <input {...password} type='password' className= 'form-control'/>
      </fieldset>
      {this.renderErrorAlert()}
      <button action= 'submit' className= 'btn btn-primary'>Login</button>
      <Link to= '/signup'>
        Sign Up
      </Link>
      </form>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {errorMessage: state.auth.loginError};
}

export default reduxForm ({
  form: 'login',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Login);