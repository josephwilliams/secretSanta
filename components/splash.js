import React, { Component } from 'react';
import firebase, { auth, database } from 'firebase';

import AuthContainer from './auth-container';
import UserList from './userlist';
import MainContent from './content';
import SignOutButton from './signout';
import Countdown from './countdown';

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
        <div className={'splash-top'}>
          { !currentUser && <AuthContainer /> }
          { !!currentUser && <MainContent /> }
          <div style={{ width: '200px', height: 'auto', borderRadius: '15px', margin: '10px', border: '1px solid black' }} />
        </div>
        <div className={'splash-bottom'}>
          <div style={{ width: '200px', height: 'auto', borderRadius: '15px', margin: '10px', border: '1px solid black' }} />
          <div className={'splash-quadrant'}>
            <Countdown />
            <UserList users={users} />
          </div>
        </div>
          { !!currentUser && <SignOutButton /> }
      </div>
    );
  }
}
