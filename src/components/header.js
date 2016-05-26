import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/index';
import { Tabs, Tab, InkBar } from 'material-ui/Tabs';
import { tealA400 } from 'material-ui/styles/colors';

class Header extends React.Component {
  render () {
    return (
      <Tabs value={this.props.value} inkBarStyle= {{background: tealA400}} >  
        <Tab value={2} label='Pending Polls' containerElement={<Link to='/pendingpolls' />}> </Tab>
        <Tab value={3} label='Results Polls' containerElement={<Link to='/resultspolls' />}> </Tab>
        <Tab value={4} label='Create Poll' containerElement={<Link to='/createpoll' />}> </Tab>
        <Tab value={5} onClick= { ()=> this.props.logoutUser() }label='Logout' containerElement={<Link to='/' />}> </Tab>
      </Tabs>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({logoutUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);