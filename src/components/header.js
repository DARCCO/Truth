import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../actions/index';
import { Tabs, Tab, InkBar } from 'material-ui/Tabs';
import { tealA400 } from 'material-ui/styles/colors';

class Header extends React.Component {
  render () {

    var style = {
      color: "#394264 !important",
      textColor: '#394264 !important',
      backgroundColor: '#EDEDED !important'
    }

    return (
      <Tabs value={this.props.value} inkBarStyle= {{background: tealA400}} >
        <Tab value={2} style={style} label='Pending Polls' containerElement={<Link to='/pendingpolls' />}> </Tab>
        <Tab value={3} style={style} label='Results Polls' containerElement={<Link to='/resultspolls' />}> </Tab>
        <Tab value={4} style={style} label='Create Poll' containerElement={<Link to='/createpoll' />}> </Tab>
        <Tab value={5} style={style} onClick= { ()=> this.props.signoutUser() }label='Logout' containerElement={<Link to='/' />}> </Tab>
      </Tabs>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({signoutUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);