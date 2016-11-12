import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class SignOutButton extends Component {
  constructor(props){
    super();
  }
  
  render() {
    return (
      <div className={'signout-button'} onClick={()=>this.props.signOut()}>
        {'Sign out'}
      </div>
    );
  }
}
