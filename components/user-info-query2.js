import React, { Component } from 'react';

import QueryText from './query-text';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

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
    return (
      <div>
        <div className={'splash-row'}>
          <div className={'query-wrapper'}>
            <input
              type={'text'}
              placeholder={this.state.name}
              onChange={this._onChange('name')}
              className={'input'}
              style={{ borderColor: '#ef4754' }}
            />
            <input
              type={'text'}
              placeholder={this.state.wishListUrl}
              onChange={this._onChange('wishListUrl')}
              className={'input'}
              style={{ borderColor: '#ef4754' }}
            />
            <textarea
              type={'text'}
              placeholder={"anything you'd like to add?"}
              value={this.state.customMessage}
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
