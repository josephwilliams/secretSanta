import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class SignOutButton extends Component {
  _signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
      console.log('!!! signout error', error);
    });

    forceUpdate();
  }

  render() {
    return (
      <div className={'signout-button'} onClick={()=>this._signOut()}>
        {'Sign out'}
      </div>
    );
  }
}
