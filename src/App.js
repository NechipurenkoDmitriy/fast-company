import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const usersNumber = users.length;
  //console.log(users);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    const remarkedUsers = [...users];
    remarkedUsers.forEach((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
    });
    setUsers(remarkedUsers);
  };

  return (
    <div>
      {<SearchStatus length={usersNumber} />}
      {
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      }
    </div>
  );
}

export default App;
