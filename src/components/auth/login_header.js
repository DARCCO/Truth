import React from 'react';
import { Link } from 'react-router';
import { Tabs, Tab, InkBar } from 'material-ui/Tabs';
import { tealA400 } from 'material-ui/styles/colors';

class LoginHeader extends React.Component {
  render (){
    return (
      <Tabs value={this.props.value} inkBarStyle= {{background: tealA400}} >  
        <Tab value={0} label='Login' containerElement={<Link to='/login' />}> </Tab>
        <Tab value={1} label='Sign Up' containerElement={<Link to='/signup' />}> </Tab>
      </Tabs>
    );
  }
}

export default LoginHeader;