import React, { Component } from 'react';

import UserInfoQuery from './user-info-query';
import CoreContent from './core-content';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Content extends Component {
  constructor(props) {
    super();
    this.state = {
      userObject: {},
      userHasCompletedSignup: false,
    };
  }

  componentDidMount() {
    let that = this;

    // NOTE test case
    let userObjectRef2 = firebase.database().ref('users/');
    userObjectRef2.on('value', function(snapshot) {
      let userObject = snapshot.val();
      console.log('users!', userObject);
    });

    this.checkHasUserCompletedSignup();
  }

  _setUserObject(userId) {
    let that = this;
    let userObjectRef = firebase.database().ref('users/' + userId);
    userObjectRef.on('value', function(snapshot) {
      let userObject = snapshot.val();
      console.log('userObject!', userObject);
      that.setState({ userObject: userObject });
    });
  }

  checkHasUserCompletedSignup() {
    let user = firebase.auth().currentUser;

    let that = this;
    if ( user ) {
      let userId = user.uid;
      let userObjectRef = firebase.database().ref('users/' + userId);
      userObjectRef.on('value', function(snapshot) {
        let userObject = snapshot.val();
        that.setState({ userObject: userObject });
      });
    }
  }

  render() {
    const { signOut, currentUser } = this.props;
    const { userObject } = this.state;

    console.log('userObject from content', userObject);

    let isSignupCompleted = userObject.hasCompletedSignup;

    console.log('hasCompletedSignup?', isSignupCompleted);

    return (
      <div className={'splash-row'}>
        <div className={'content-wrapper'}>
          { currentUser && !isSignupCompleted && <UserInfoQuery setUserObject={this._setUserObject.bind(this)}/> }
          { currentUser && isSignupCompleted && <CoreContent signOut={signOut} currentUser={userObject} /> }
        </div>
      </div>
    );
  }
}
