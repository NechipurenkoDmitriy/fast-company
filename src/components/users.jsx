import React, { useState } from 'react';
import api from '../api';
import { getNoun } from '../utils/getNoun';
import { usersHeaderRow } from '../constants/table';

const Users = () => {
  // console.log(api.users.fetchAll());
  const [users, setUsers] = useState(api.users.fetchAll());
  const usersNumber = Object.keys(users).length;

  //console.log(users);

  const handleDelete = (userId) => {
    // console.log(userId);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const oneMan = 'человек тусанёт';
    const twoMen = 'человека тусанут';
    const fiveMen = 'человек тусанут';
    const withYou = 'с тобой сегодня';

    const phrase =
      number !== 0
        ? `${number} ${getNoun(number, oneMan, twoMen, fiveMen)} ${withYou}`
        : `Никто не тусанет ${withYou}`;

    return phrase;
  };

  const renderUsersTable = () => {
    const usersThead = usersHeaderRow;

    const renderTh = (innerHTML, uniqueKey = innerHTML) => {
      return (
        <th scope="col" key={uniqueKey}>
          {innerHTML}
        </th>
      );
    };

    const renderQualities = (user) => {
      return user.qualities.map((quality) => (
        <div key={quality._id} className={`badge bg-${quality.color} m-1`}>
          {quality.name}
        </div>
      ));
    };

    const renderTheadRow = () => {
      return usersThead.map((column) => renderTh(column.text));
    };

    const renderUserRow = (user) => {
      return usersThead.map((column) => {
        const defKey = column.key;
        switch (defKey) {
          case 'profession':
            return renderTh(user[defKey].name);
          case 'qualities':
            return renderTh(renderQualities(user), defKey);
          case 'rate':
            return renderTh(`${user[defKey]}/5`, defKey);
          case 'deleteKey':
            return renderTh(
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>,
              defKey
            );
          default:
            return renderTh(user[defKey], defKey);
        }
      });
    };

    return (
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
    );
  };

  return (
    <div>
      <span
        className={`m-2 badge bg-${usersNumber !== 0 ? 'primary' : 'danger'}`}
      >
        {renderPhrase(usersNumber)}
      </span>
      {renderUsersTable(users)}
    </div>
  );
};

export default Users;
