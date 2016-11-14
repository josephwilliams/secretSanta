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
    };
  }

  componentDidMount() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({ currentUser: user });
      } else {
        // No user is signed in.
      }
    });

    // next
    let usersObjectRef = firebase.database().ref('people/');

    usersObjectRef.on('value', function(snapshot) {
      console.log('snapshot', snapshot);

      let usersObject = snapshot.val();
      let users = [];

      console.log('user object', usersObject);

      _.forOwn(usersObject, function(value, key) {
        users.push(value);
      });

      console.log('users', users);
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
    } = this.state;

    // NOTE get users
    const users = [
      'user1',
      'user2',
      'user3',
    ];

    return (
      <div className={'splash'}>
        { !currentUser && <AuthContainer /> }
        { !!currentUser && <MainContent currentUser={currentUser} signOut={this._signOut.bind(this)}/> }
        { !currentUser &&  <WelcomeText /> }
        <Countdown />
        <UserList />
      </div>
    );
  }
}
