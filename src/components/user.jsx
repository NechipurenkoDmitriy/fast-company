import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';
import { renderCell } from '../utils/renderCell';

const User = ({ user, ...rest }) => {
  const renderQualities = (user) => {
    return user.qualities.map((quality) => (
      <Qualitie
        key={quality._id}
        color={quality.color}
        name={quality.name}
        _id={quality._id}
      />
    ));
  };

  const renderDeleteBtn = () => {
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => rest.onDelete(user._id)}
      >
        Delete
      </button>
    );
  };

  return (
    <tr key={user._id}>
      {renderCell(user.name)}
      {renderCell(renderQualities(user))}
      {renderCell(user.profession.name)}
      {renderCell(user.completedMeetings)}
      {renderCell(`${user.rate}/5`)}
      {renderCell(
        <BookMark
          status={user.bookmark}
          userId={user._id}
          onToggleBookmark={rest.onToggleBookmark}
        />
      )}
      {renderCell(renderDeleteBtn())}
    </tr>
  );
};

export default User;
