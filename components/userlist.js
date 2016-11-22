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
    console.log('begun');

    let that = this;
    let usersObjectRef = firebase.database().ref('people/');
    usersObjectRef.on('value', function(snapshot) {
      console.log('snapshot', snapshot);

      let usersObject = snapshot.val();
      let users = [];

      // console.log('user object', usersObject);

      _.forOwn(usersObject, function(value, key) {
        users.push(value);
      });

      // console.log('users', users);

      that.setState({ users: users });
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div className={'userlist-wrapper'}>
        <div className={'userlist-content'}>
          {users.map((user, index) => {
            const firstName = user.name.split(' ')[0];
            return (
              <div className={'userlist-item'} key={index}>
                {firstName}
              </div>
            );
          })
         }
        </div>
        <img
          src={'./images/christmas_village.png'}
          style={{ borderRadius: '15px', margin: '5px 10px 20px 0' }}>
        </img>
      </div>
    );
  }
}
