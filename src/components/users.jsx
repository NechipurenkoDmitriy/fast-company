import React, { useState } from 'react';
import api from '../api';
import { getNoun } from '../utils/getNoun';

const Users = () => {
  // console.log(api.users.fetchAll());
  const [users, setUsers] = useState(api.users.fetchAll());
  const usersNumber = Object.keys(users).length;
  const usersThead = [
    { key: 'name', text: 'Имя' },
    { key: 'qualities', text: 'Качества' },
    { key: 'profession', text: 'Профессия' },
    { key: 'completedMeetings', text: 'Встретился, раз' },
    { key: 'rate', text: 'Оценка' },
    { key: 'deleteKey', text: '' },
  ];

  console.log(users);
  //const handleDelete = (userId) => {};

  const renderPhrase = (number) => {
    const oneMan = 'человек тусанёт';
    const twoMen = 'человека тусанут';
    const fiveMen = 'человек тусанут';
    const withYou = 'с тобой сегодня';

    const phrase =
      number !== 0
        ? number +
          ' ' +
          getNoun(number, oneMan, twoMen, fiveMen) +
          ' ' +
          withYou
        : `Никто не тусанет ${withYou}`;

    return phrase;
  };

  const renderQualities = (user) => {
    return user.qualities.map((quality) => (
      <div key={quality._id} className={`badge bg-${quality.color} m-1`}>
        {quality.name}
      </div>
    ));
  };

  const renderTheadRow = () => {
    return usersThead.map((column) => (
      <th scope="col" key={column.text + Date.now()}>
        {column.text}
      </th>
    ));
  };

  const renderUserRow = (user) => {
    return usersThead.map((column) => {
      if (column.key === 'deleteKey') {
        return (
          <td key={column.key}>
            <button className="badge bg-danger">Delete</button>
          </td>
        );
      }
      if (column.key === 'profession') {
        return (
          <th scope="col" key={user[column.key].name}>
            {user[column.key].name}
          </th>
        );
      }
      if (column.key === 'qualities') {
        return (
          <th scope="col" key={column.key}>
            {renderQualities(user)}
          </th>
        );
      }

      return (
        <th scope="col" key={user[column.key]}>
          {user[column.key]}
        </th>
      );
    });
  };

  return (
    <div>
      <span
        className={`m-2 badge bg-${usersNumber !== 0 ? 'primary' : 'danger'}`}
      >
        {renderPhrase(usersNumber)}
      </span>

      <table className="table">
        <thead>
          <tr>{renderTheadRow()}</tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>{renderUserRow(user)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
