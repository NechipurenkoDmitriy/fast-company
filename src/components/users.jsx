import React, { useState } from 'react';
import api from '../api';
import { getNoun } from '../utils/getNoun';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const usersNumber = users.length;
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
    const renderCell = (innerHTML) => {
      return <th scope="col">{innerHTML}</th>;
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
            {renderCell('Имя')}
            {renderCell('Качества')}
            {renderCell('Профессия')}
            {renderCell('Встретился, раз')}
            {renderCell('Оценка')}
            {renderCell('')}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {renderCell(user.name)}
              {renderCell(renderQualities(user))}
              {renderCell(user.profession.name)}
              {renderCell(user.completedMeetings)}
              {renderCell(`${user.rate}/5`)}
              {renderCell(
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
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
