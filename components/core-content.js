import React, { Component } from 'react';

import ContentText from './content-text';
import SignOutButton from './signout';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class CoreContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={'core-content-wrapper'}>
        <div className={'splash-row'}>
          <ContentText />
        </div>
        <SignOutButton signOut={this.props.signOut} />
      </div>
    );
  }
}
