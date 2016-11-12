import React, { Component } from 'react';

import classnames from 'classnames';

import AuthSignUp from './auth-signup';
import AuthLogIn from './auth-login';
import Countdown from './countdown';

export default class AuthContainer extends Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 'signup',
    };
  }

  toggleTabs() {
    const newTab = this.state.selectedTab === 'signup' ? 'login' : 'signup';
    this.setState({ selectedTab: newTab });
  }

  renderTabs() {
    const { selectedTab } = this.state;
    const authTabs = ['signup', 'login'];

    return (
      <div className={'auth-tabs-wrapper'}>
        { authTabs.map((tabName, index) => {
          return ( tabName === selectedTab ? (
            <div className={'auth-tab-active'} key={index}>
              {tabName}
            </div>
          ) :
         (
          <div className={'auth-tab-inactive'} key={index} onClick={()=>this.toggleTabs()}>
            {tabName}
          </div>
        ))
        })}
      </div>
    );
  }

  render() {
    const { selectedTab } = this.state;
    const isSignUpTab = selectedTab === 'signup';
    const isLogInTab = selectedTab === 'login';

    return (
      <div className={'splash-row'}>
        <img src={'./images/flat_elf.jpg'} className={'splash-image'}></img>
        <div className={'auth-container'}>
          { this.renderTabs() }
          { isSignUpTab && <AuthSignUp /> }
          { isLogInTab && <AuthLogIn /> }
        </div>
      </div>
    );
  }
}
