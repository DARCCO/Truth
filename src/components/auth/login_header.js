import React from 'react';
import { Link } from 'react-router';

class LoginHeader extends React.Component {
  render (){
    return (
      <div>
        <Link to= '/login' className="col-md-6 btn btn-primary">
          Login
        </Link>
        <Link to= '/signup' className="col-md-6 btn btn-primary">
          Signup
        </Link>
      </div>
    );
  }
}

export default LoginHeader;