import React, { Component } from 'react';
import firebase from 'firebase';

export default class BasicInfoQuery extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      wishListUrl: '',
      customMessage: '',
      errorMessage: '',
    }
  }

  _onChange = (field) => {
    this.setState({
      [field]: event.target.value,
    });
  }

  _onSubmit() {
    firebase.auth().firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('auth error!', errorCode, errorMessage);
    });
  }

  render() {
    return (
      <div className={'auth-wrapper'}>
        <input
          type={'text'}
          placeholder={'your first name'}
          onChange={this._onChange('name')}
          className={'input'}
        />
        <input
          type={'text'}
          placeholder={'your Amazon wishlist URL'}
          onChange={this._onChange('wishListUrl')}
          className={'input'}
        />
        <textarea
          type={'text'}
          placeholder={'anything you want to add? :)'}
          onChange={this._onChange('customMessage')}
          className={'textarea'}
        />
        <div className={'auth-error-message'}>
          {this.state.errorMessage}
        </div>
        <div
          className={'auth-submit-button'}
          onClick={this._onSubmit}
        >
          {'submit'}
        </div>
      </div>
    );
  }
}
