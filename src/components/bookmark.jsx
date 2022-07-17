import React from 'react';
import {
  ICON_BOOKMARK_X as OFF_ICON,
  ICON_BOOKMARK_PLUS_FILL as ON_ICON,
} from '../assets/icons';

const BookMark = ({ status, ...rest }) => {
  return (
    <button
      className={`btn btn-sm btn-${!status ? 'secondary' : 'success'}`}
      onClick={() => rest.onToggleBookmark(rest.userId)}
    >
      {!status ? OFF_ICON() : ON_ICON()}
    </button>
  );
};

export default BookMark;
