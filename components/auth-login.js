import React, { Component } from 'react';
// import * as firebase from 'firebase';

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
    }
  }

  _onChange(field) {
    () => {
      this.setState({
        [field]: event.target.value,
      });
    }
  }

  _onSubmit() {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('auth error!', errorCode, errorMessage);
    });
  }

  render() {
    return (
      <div className={'signup-wrapper'}>
        <input
          type='text'
          placeholder={'your email address'}
          onChange={this._onChange('email')}
          value={this.state.email}
          className={'input'}
        />
        <input
          type={'password'}
          placeholder={'your password.  remember it!'}
          onChange={this._onChange('password')}
          value={this.state.password}
          className={'input'}
        />
        <div className={'auth-error-message'}>
          {this.state.errorMessage}
        </div>
        <input
          type={'submit'}
          value={'submit'}
          className={'auth-submit-button'}
          onSubmit={this._onSubmit}
        />
      </div>
    );
  }
}
