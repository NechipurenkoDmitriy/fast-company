import React, { useState } from 'react';
import api from '../api';
import { getNoun } from '../utils/getNoun';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const usersNumber = users.length;
  //console.log(users);

  const renderBookmark = (user) => {
    const bookmarkCheck = !user.bookmark;

    const OFF_ICON = () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bookmark-x"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z"
          />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
        </svg>
      );
    };

    const ON_ICON = () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bookmark-plus-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"
          />
        </svg>
      );
    };

    return (
      <button
        className={`btn btn-sm btn-${bookmarkCheck ? 'secondary' : 'success'}`}
        onClick={() => handleFavorite(user._id)}
      >
        {bookmarkCheck ? OFF_ICON() : ON_ICON()}
      </button>
    );
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleFavorite = (userId) => {
    const remarkedUsers = [...users];
    remarkedUsers.forEach((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
    });
    setUsers(remarkedUsers);
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
            {renderCell('Избранное')}
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
              {renderCell(renderBookmark(user))}
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
