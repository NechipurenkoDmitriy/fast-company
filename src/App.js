import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    // console.log("users from app", users);
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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
