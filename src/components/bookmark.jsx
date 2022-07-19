import React from "react";
import PropTypes from "prop-types";
import {
    ICON_BOOKMARK_X as OFF_ICON,
    ICON_BOOKMARK_PLUS_FILL as ON_ICON
} from "../assets/icons";

const BookMark = ({ status, ...rest }) => {
    return (
        <button
            {...rest}
            className={`btn btn-sm btn-${!status ? "secondary" : "success"}`}
        >
            {!status ? OFF_ICON : ON_ICON}
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
