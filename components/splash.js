import React, { Component } from 'react';
import firebase, { auth, database } from 'firebase';
// import FirebaseApp from '../root';

import Signup from './auth-signup';
import UserList from './userlist';
import MainContent from './content';
import SignOutButton from './signout';

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
      'one',
      'two',
      'three',
    ];

    return (
      <div className={'splash'}>
        <div className={'splash-top'}>
          { !currentUser && <Signup /> }
          { !!currentUser && <MainContent /> }
          <img src={'../images/santa_blue.jpg'}
          style={{ width: '200px', height: 'auto', borderRadius: '15px', margin: '10px' }}
          />
        </div>
        <div className={'splash-bottom'}>
          <img src={'../images/flat_elf.jpg'} style={{ borderRadius: '15px', margin: '10px' }} />
             <UserList users={users} />
          </div>
          { !!currentUser && <SignOutButton /> }
      </div>
    );
  }
}
