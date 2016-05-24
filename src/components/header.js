import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/index'

class Header extends React.Component {
  render () {
    return (
    <div>
      <Link to="/pendingpolls" className="col-md-3 btn btn-primary">
        Pending Polls
      </Link>
      <Link to="/resultspolls" className="col-md-3 btn btn-primary">
        Results Polls
      </Link>
      <Link to="/createpoll" className="col-md-3 btn btn-primary">
        Create Poll
      </Link>
      <Link to="/" onClick= {() => this.props.logoutUser()} className="col-md-3 btn btn-primary">
        Logout
      </Link>
     </div>

    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({logoutUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);