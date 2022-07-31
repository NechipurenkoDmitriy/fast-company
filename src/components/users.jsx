import React, { useState, useEffect } from "react";
import User from "./user";
import { renderCell } from "../utils/renderCell";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 2;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        // console.log(params);///
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;
    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    if (userCrop.length === 0 && currentPage !== 1) {
        // ? нужна доппроверка?
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
                    <table className="table">
                        <thead>
                            <tr>
                                {renderCell("Имя")}
                                {renderCell("Качества")}
                                {renderCell("Профессия")}
                                {renderCell("Встретился, раз")}
                                {renderCell("Оценка")}
                                {renderCell("Избранное")}
                                {renderCell("")}
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    key={user._id}
                                    {...user}
                                    {...rest} // onDelete={rest.onDelete}// onToggleBookmark={rest.onToggleBookmark}
                                />
                            ))}
                        </tbody>
                    </table>
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
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
