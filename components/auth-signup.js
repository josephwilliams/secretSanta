import React, { Component } from 'react';
// import * as firebase from 'firebase';
// import FirebaseApp from '../root';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      currentUser: {},
    }
  }

  _onChange(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  checkCurrentUser() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        const userId = user.uid;
        that._createUserObject(userId);
        that.setState({ currentUser: user });
      } else {
        // No user is signed in.

      }
    })
    .then(() => {

      that._createUserObject(that.state.currentUser.uid);
    })
    .catch((error) => {
      console.log('error!', error);
    });
  }

  _createUserObject(userId) {
    const { email } = this.state;
    firebase.database().ref('people/' + userId).set({
      email: email,
      hasCompletedSignup: false,
      userId: userId,
      name: null,
      wishListUrl: null,
      customMessage: null,
    });
  }

  _onSubmit() {
    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    this.checkCurrentUser();
    this.forceUpdate();
  }

  render() {
    return (
      <div className={'signup-wrapper'}>
        <input
          type='text'
          placeholder={'email'}
          onChange={this._onChange('email')}
          value={this.state.email}
          className={'input'}
        />
        <input
          type={'password'}
          placeholder={'password'}
          onChange={this._onChange('password')}
          value={this.state.password}
          className={'input'}
        />
        <div className={'auth-error-message'}>
          {this.state.errorMessage}
        </div>
        <input
          type={'submit'}
          value={'Sign up'}
          className={'auth-submit-button'}
          onClick={this._onSubmit.bind(this)}
        />
      </div>
    );
  }
}
