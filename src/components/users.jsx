import React, { useState } from 'react';
import api from '../api';
import { getNoun } from '../utils/getNoun';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const usersNumber = Object.keys(users).length;
  //console.log(users);

  const handleDelete = (userId) => {
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
        : `Никто ${withYou} не тусанет`;

    return phrase;
  };

  const renderUsersTable = () => {
    const renderCell = (innerHTML, uniqueKey = innerHTML) => {
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

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {renderCell(user.name, 'name')}
              {renderCell(renderQualities(user), 'qualities')}
              {renderCell(user.profession.name, 'profession')}
              {renderCell(user.completedMeetings, 'completedMeetings')}
              {renderCell(`${user.rate}/5`, 'rate')}
              {renderCell(
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>,
                'deleteButton'
              )}
            </tr>
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
