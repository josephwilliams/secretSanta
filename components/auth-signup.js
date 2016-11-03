import React, { Component } from 'react';
import * as firebase from 'firebase';
// import FirebaseApp from '../root';

// var firebase = require('firebase/app');
// require('firebase/auth');
// require('firebase/database');

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
    return event => this.setState({ [field]: event.target.value });
  }

  checkCurrentUser() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('!! currentUser', user);
        that.setState({ currentUser: user });
      } else {
        // No user is signed in.
        console.log('!!! no currentUser');
      }
    });
  }

  _onSubmit() {
    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('submit clicked!');
      this.checkCurrentUser();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('auth error!', errorCode, errorMessage);
    });

    this.forceUpdate();
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
          value={'Sign up'}
          className={'auth-submit-button'}
          onSubmit={()=>this._onSubmit}
        />
      </div>
    );
  }
}
