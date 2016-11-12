import React, { Component } from 'react';

import UserInfoQuery from './user-info-query';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Content extends Component {
  constructor(props) {
    super();
    this.state = {
      userObject: null,
    };
  }

  componentDidMount() {
    let that = this;
    let userObjectRef = firebase.database().ref('users/' + this.props.userId);
    userObjectRef.on('value', function(snapshot) {
      let userObject = snapshot.val();
      console.log('userObject!', userObject);
      that.setState({ userObject: userObject });
    });

    // NOTE test case
    let userObjectRef2 = firebase.database().ref('users/');
    userObjectRef2.on('value', function(snapshot) {
      let userObject = snapshot.val();
      console.log('users!', userObject);
    });
  }

  render() {
    const { userObject } = this.state;

    console.log('userObject from content', userObject);

    const hasCompletedSignup = false;
    if ( userObject ) {
      const hasCompletedSignup = userObject.hasCompletedSignup;
    }

    console.log('hasCompletedSignup?', hasCompletedSignup);

    return (
      <div className={'splash-row'}>
        <div className={'content-wrapper'}>
          { !hasCompletedSignup && <UserInfoQuery /> }
          { hasCompletedSignup && 'content!'}
        </div>
      </div>
    );
  }
}
