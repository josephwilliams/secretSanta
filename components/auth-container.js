import React, { Component } from 'react';

import classnames from 'classnames';

import AuthSignUp from './auth-signup';
import AuthLogIn from './auth-login';

export default class AuthContainer extends Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 'signup';
    }
  }

  renderTabs() {
    <div className={'auth-tabs-wrapper'}>
      <div className={'auth-tab-signup'}>
        {'signup'}
      </div>
      <div className={'auth-tab-login'}>
        {'login'}
      </div>
    </div>
  }

  render() {
    { selectedTab } = this.state;
    isSignUpTab = selectedTab === 'signup';
    isLogInTab = selectedTab === 'login';

    return (
      <div className={'auth-container'}>
        <img src={'../images/santa_blue.jpg'} style={{ borderRadius: '15px' }} />
        { this.renderTabs() }
        { isSignUpTab && <AuthSignUp /> }
        { isLogInTab && <AuthLogIn /> }
      </div>
    )
  }
}
