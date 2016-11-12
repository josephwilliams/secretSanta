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
  }

  render() {
    const { userObject } = this.state;

    console.log('userObject from content', userObject);

    const userId = null;
    const hasCompletedSignup = false;
    if ( userObject ) {
      const userId = userObject.userId;
      const hasCompletedSignup = userObject.hasCompletedSignup;
    }

    return (
      <div className={'splash-row'}>
        <div className={'content-wrapper'}>
          { !hasCompletedSignup && <UserInfoQuery userId={userId}/> }
          { hasCompletedSignup && 'content!'}
        </div>
      </div>
    );
  }
}
