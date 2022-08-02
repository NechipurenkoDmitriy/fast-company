import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import api from "../api";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import SearchStatus from "./searchStatus";
import GroupList from "./groupList";
import UserTable from "./usersTable";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState(); // [] - без него не грузится

    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
        // console.log(item);
    };
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

    if (users) {
        // const usersValues = users; // Object.values(users);
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id) // _.isEqual(user.profession, selectedProf))
            : users;
        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);

        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        if (userCrop.length === 0 && currentPage !== 1) {
            // pagination bag fix // ? нужна доппроверка?
            setCurrentPage(currentPage - 1);
        }

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column p-3">
                    {<SearchStatus length={count} />}
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Users;
