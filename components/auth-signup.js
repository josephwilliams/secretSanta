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
        console.log('!! currentUser', user);

        const userId = user.uid;
        that._createUserObject(userId);
        that.setState({ currentUser: user });
      } else {
        // No user is signed in.
        console.log('!!! no currentUser');
      }
    })
    .then(() => {
      console.log('email, currentUser in auth-signup', that.state.email, that.state.currentUser);

      that._createUserObject(that.state.currentUser.uid);
    })
    .catch((error) => {
      console.log('auth-signup error!', error);
    });
  }

  _createUserObject(userId) {
    const { email } = this.state;
    console.log('_createUserObject called', userId, email);
    firebase.database().ref('users/' + userId).set({
      email: email,
      hasCompletedSignup: false,
      userId: userId,
    });
  }

  _onSubmit() {
    const { email, password } = this.state;

    console.log('begun');

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('submit clicked!', user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('createUser auth error!', errorCode, errorMessage);
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
