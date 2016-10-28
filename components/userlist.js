import React, { Component } from 'react';

export default class UserList extends Component {
  render() {
    const { users } = this.props;

    return (
      <div className={'userlist-wrapper'}>
        {users.map((user, index) => {
          return (
            <div className={'userlist-item'} key={index}>
              {user}
            </div>
          );
        })
       }
      </div>
    );
  }
}
