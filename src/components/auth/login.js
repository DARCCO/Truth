import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import * as actions from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LoginHeader from './login_header';
import Paper from 'material-ui/Paper';
import { cyan100, lightBlue50, teal50 } from 'material-ui/styles/colors';

class Login extends Component {
  handleFormSubmit({username, password}) {
    this.props.loginUser({ username, password });
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
    const style = {
      height:  750,
      //backgroundColor: teal50
    };
    return (
      <div>
        <LoginHeader value ={0} />
        <Paper style= {style} zDepth= {4}>
        <div className= 'centered-Create'>
        <form onSubmit= {handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className= 'form-group'>
          <TextField halfWidth hintText= 'Username' { ...username }/>
        </fieldset>
        <fieldset className= 'form-group'>
          <TextField halfWidth type= 'password' hintText= 'Password' { ...password }/>
        </fieldset>
        {this.renderErrorAlert()}
        <RaisedButton type='submit' label= 'Login' primary= {true}/>      
        <Link to= '/signup'>
         <FlatButton label='Sign up' secondary= {true} />
        </Link>
        </form>
        </div>
        </Paper>
      </div>
    );
  }
};

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm ({
  form: 'login',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Login);