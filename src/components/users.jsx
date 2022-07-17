import React from 'react';
import User from './user';
import { renderCell } from '../utils/renderCell';

const Users = ({ users, ...rest }) => {
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
          <User
            key={user._id}
            user={user}
            onDelete={rest.onDelete}
            onToggleBookmark={rest.onToggleBookmark}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
