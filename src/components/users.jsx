import React, { useState } from "react";
import User from "./user";
import { renderCell } from "../utils/renderCell";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    if (userCrop.length === 0 && currentPage !== 1) {
        // ? нужна доппроверка?
        setCurrentPage(currentPage - 1);
    }

    return (
        <>
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
