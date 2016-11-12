import React, { Component } from 'react';

import QueryText from './query-text';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class BasicInfoQuery extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      wishListUrl: '',
      customMessage: '',
      errorMessage: '',
    };
  }

  _onChange(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  _onSubmit() {
    const { name, wishListUrl, customMessage } = this.state;
    this._updateUserObject(name, wishListUrl, customMessage);
  }

  _updateUserObject(name, wishListUrl, customMessage) {
    const { userId } = this.props;

    firebase.database().ref('users/' + userId).set({
      name: name,
      wishListUrl: wishListUrl,
      customMessage: customMessage,
    });
  }

  render() {
    return (
      <div>
        <div className={'splash-row'}>
          <img
            src={'../images/santa_blue.jpg'}
            className={'splash-image'}
            style={{ height: '162px', width: '180px' }}
          />
          <div className={'query-wrapper'}>
            <input
              type={'text'}
              placeholder={'your first name'}
              onChange={this._onChange('name')}
              className={'input'}
              style={{ borderColor: '#ef4754' }}
            />
            <input
              type={'text'}
              placeholder={'your Amazon wishlist URL'}
              onChange={this._onChange('wishListUrl')}
              className={'input'}
              style={{ borderColor: '#ef4754' }}
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
              onClick={this._onSubmit.bind(this)}
            >
              {'submit'}
            </div>
          </div>
        </div>
        <QueryText />
      </div>
    );
  }
}
