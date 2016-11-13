import React, { Component } from 'react';
import _ from 'lodash';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    let that = this;
    let usersObjectRef = firebase.database().ref('people/');
    usersObjectRef.on('value', function(snapshot) {
      let usersObject = snapshot.val();
      let users = [];

      _.forOwn(usersObject, function(value, key) {
        users.push(value);
      });

      that.setState({ users: users });
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div className={'userlist-wrapper'}>
        {users.map((user, index) => {
          return (
            <div className={'userlist-item'} key={index}>
              {user.name}
            </div>
          );
        })
       }
      </div>
    );
  }
}
