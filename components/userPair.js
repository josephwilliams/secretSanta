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
      otherUserObject: { name: '' },
    };
  }

  componentWillMount() {
    this.getUserInfo();
  }

  componentDidMount() {
    this.getOtherUserInfo();
  }

  getOtherUserInfo(userId) {
    const otherUserId = this.state.userObject.pairedUser;
    let that = this;
    let userObjectRef = firebase.database().ref('people/' + otherUserId);
    userObjectRef.on('value', function(snapshot) {
      let otherUserObject = snapshot.val();
      // console.log('!!! other userObject!', otherUserObject);
      that.setState({ otherUserObject: otherUserObject });
    });
  }

  getUserInfo() {
    let user = firebase.auth().currentUser;

    let that = this;
    if ( user ) {
      let userId = user.uid;
      let userObjectRef = firebase.database().ref('people/' + userId);
      userObjectRef.on('value', function(snapshot) {
        let userObject = snapshot.val();
        that.setState({ userObject: userObject });
      });
    }
  }

  render() {
    const { otherUserObject } = this.state;

    const name = otherUserObject.name;
    const customMessage = otherUserObject.customMessage;
    const wishList = otherUserObject.wishListUrl;

    return (
      <div className={'splash-row'}>
        <div className={'content-wrapper'}>
          <img
            src={'./images/red_hat.png'}
            style={{ borderRadius: '15px', width: '100px', height: '100px' }}>
          </img>
          <div className={'label'}>{'Secret Santa has begun! You got: '}</div>
          <h2 style={{ margin: '0' }}>{name}</h2>
          { !!customMessage &&
            <div>
              <div className={'label'}>{'message:'}</div>
              <div className={'text'}>{customMessage}</div>
            </div>
          }
          { !!wishList &&
            <div>
              <div className={'label'}>{'wish list URL:'}</div>
              <div className={'text'}>{wishList}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}
