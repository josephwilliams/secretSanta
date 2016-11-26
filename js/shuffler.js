import _ from 'lodash';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


class Shuffler {
  constructor() {
    this.users = [];

    this.initialize();
    this.shuffleUsers();
  }

  initialize() {
    let that = this;
    let usersObjectRef = firebase.database().ref('people/');
    usersObjectRef.on('value', function(snapshot) {
      // console.log('snapshot', snapshot);

      let usersObject = snapshot.val();
      let users = [];

      _.forOwn(usersObject, function(value, key) {
        users.push(value);
      });

      // console.log('users', users);
    });
  }

  shuffleUsers() {
    const users = _.shuffle(this.users);
    this.users = users;
  }

  pairUsers() {
  }
}
