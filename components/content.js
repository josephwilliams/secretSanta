import React, { Component } from 'react';

import UserInfoQuery from './user-info-query';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Content extends Component {
  constructor(props) {
    super();
    this.state = {
      userObject: { hasCompletedSignup: false },
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

  render() {
    const { userObject } = this.state;

    console.log('userObject from content', userObject);

    let isSignupCompleted = userObject.hasCompletedSignup;

    console.log('hasCompletedSignup?', isSignupCompleted);

    return (
      <div className={'splash-row'}>
        <div className={'content-wrapper'}>
          { !isSignupCompleted && <UserInfoQuery setUserObject={this._setUserObject.bind(this)}/> }
          { isSignupCompleted && 'content!'}
        </div>
      </div>
    );
  }
}
