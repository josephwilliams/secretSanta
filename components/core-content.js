import React, { Component } from 'react';

import ContentText from './content-text';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class CoreContent extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={'splash-row'}>
        <ContentText />
      </div>
    );
  }
}
