import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import { renderCell } from "../utils/renderCell";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onDelete,
    onToggleBookmark
}) => {
    const renderQualities = (qualities) => {
        return qualities.map((quality) => (
            <Qualitie key={quality._id} {...quality} />
        ));
    };

    const renderDeleteBtn = () => {
        return (
            <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(_id)}
            >
                Delete
            </button>
        );
    };

    return (
        <tr key={_id}>
            {renderCell(name)}
            {renderCell(renderQualities(qualities))}
            {renderCell(profession.name)}
            {renderCell(completedMeetings)}
            {renderCell(`${rate}/5`)}
            {renderCell(
                <BookMark
                    status={bookmark}
                    onClick={() => onToggleBookmark(_id)}
                />
            )}
            {renderCell(renderDeleteBtn())}
        </tr>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired, // ?
    profession: PropTypes.object.isRequired, // ?
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default User;
