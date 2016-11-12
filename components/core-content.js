import React, { Component } from 'react';

import ContentText from './content-text';
import SignOutButton from './signout-button';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class CoreContent extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  _signOut() {
    let that = this;
    firebase.auth().signOut().then(function() {
      that.setState({ currentUser: null });
    }, function(error) {
      // An error happened.
      console.log('!!! signout error', error);
    });
  }

  render() {
    return (
      <div className={'splash-row'}>
        <ContentText />
        <SignOutButton signOut={this._signOut.bind(this)} />
      </div>
    );
  }
}
