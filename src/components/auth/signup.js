import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signup extends Component {
  handleFormSubmit(formProps){
    this.props.signUpUser(formProps);
  }
  renderAlert(){
    if (this.props.errorMessage) {
      return (
        <div className= 'alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }
  render() {
      const { handleSubmit, fields: { username, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit= {handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className= 'form-group'>
          <label>Username:</label>
          <input className= 'form-control' {...username}/>
          {username.touched && username.error && <div className= 'error'>{username.error}</div>}
        </fieldset>
        <fieldset className= 'form-group'>
          <label>Password:</label>
          <input className= 'form-control' {...password} type= 'password'/>
          {password.touched && password.error && <div className= 'error'>{password.error}</div>}
        </fieldset>
        <fieldset className= 'form-group'>
          <label>Confirm Password:</label>
          <input className= 'form-control' {...passwordConfirm} type= 'password'/>
          {passwordConfirm.touched && passwordConfirm.error && <div className= 'error'>{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action= 'submit' className= 'btn btn-primary'>Sign Up</button>
        <Link to= '/login'>
          Login
        </Link>
      </form>
      );
  }
}

function validate(formProps) {
  const errors= {};

  if(!formProps.username){
    errors.username= 'Please enter a username';
  }

  if (!formProps.password){
    errors.password= 'Please enter a password';
  }

  if(!formProps.passwordConfirm){
    errors.passwordConfirm= 'Please enter a password confirmation';
  }

  if(formProps.password !== formProps.passwordConfirm){
    errors.passwordConfirm= 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.signupError};
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);