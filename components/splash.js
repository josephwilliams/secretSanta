import React, { Component } from 'react';
import firebase, { auth, database } from 'firebase';

import AuthContainer from './auth-container';
import UserList from './userlist';
import MainContent from './content';
import SignOutButton from './signout';
import Countdown from './countdown';
import WelcomeText from './welcome-text';

export default class Splash extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      users: [],
    }
  }

  componentDidMount() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('!! currentUser', user);
        that.setState({ currentUser: user });
      } else {
        // No user is signed in.
        console.log('!!! no currentUser');
      }
    });
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
    const {
      currentUser,
      // users,
    } = this.state;

    const users = [
      'user1',
      'user2',
      'user3',
    ];

    return (
      <div className={'splash'}>
        { !currentUser && <AuthContainer /> }
        { !!currentUser && <MainContent /> }
        { !currentUser &&  <WelcomeText /> }
          <img src={'../images/christmas_village.png'} style={{ borderRadius: '15px', margin: '5px 10px 20px 0' }} />
          { !!currentUser && <SignOutButton signOut={this._signOut.bind(this)} /> }
      </div>
    );
  }
}
