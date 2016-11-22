import React, { Component } from 'react';

import QueryText from './query-text';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function showValueOrPlaceholder(value, placeholder) {
  return value === '' ? placeholder : value;
}

export default class PostSignupQuery extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      wishListUrl: '',
      customMessage: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let that = this;
    let userObjectRef = firebase.database().ref('people/' + userId);
    userObjectRef.on('value', function(snapshot) {
      let userObject = snapshot.val();
      that.setState({
        wishListUrl: userObject.wishListUrl,
        customMessage: userObject.customMessage,
        name: userObject.name,
      });
    });
  }

  _onChange(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  _onSubmit() {
    const { name, wishListUrl, customMessage } = this.state;
    this._updateUserObject(name, wishListUrl, customMessage);
  }

  _updateUserObject(name, wishListUrl, customMessage) {
    let user = firebase.auth().currentUser;
    let userId = user.uid;

    firebase.database().ref('people/' + userId).set({
      name: name,
      wishListUrl: wishListUrl,
      customMessage: customMessage,
      hasCompletedSignup: true,
    });

    this.props.setUserObject(userId);
  }

  render() {
    let shownName = showValueOrPlaceholder(this.state.name, 'name');
    let shownUrl = showValueOrPlaceholder(this.state.wishListUrl, 'wishlist URL, e.g. Amazon');
    let shownMessage = showValueOrPlaceholder(this.state.customMessage, "anything else you'd like to add?");
    return (
      <div>
        <div className={'splash-row'}>
          <div className={'query-wrapper'}>
            <input
              type={'text'}
              placeholder={shownName}
              onChange={this._onChange('name')}
              className={'input'}
              style={{ borderColor: '#ef4754' }}
            />
            <input
              type={'text'}
              placeholder={shownUrl}
              onChange={this._onChange('wishListUrl')}
              className={'input'}
              style={{ borderColor: '#ef4754' }}
            />
            <textarea
              type={'text'}
              placeholder={shownMessage}
              onChange={this._onChange('customMessage')}
              className={'textarea'}
            />
            <div className={'auth-error-message'}>
              {this.state.errorMessage}
            </div>
            <div
              className={'auth-submit-button'}
              onClick={this._onSubmit.bind(this)}
            >
              {'submit'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
