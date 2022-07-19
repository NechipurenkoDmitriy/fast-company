import React from "react";
import { getNoun } from "../utils/getNoun";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const oneMan = "человек тусанёт";
        const twoMen = "человека тусанут";
        const fiveMen = "человек тусанут";
        const withYou = "с тобой сегодня";

        const phrase =
            number !== 0
                ? `${number} ${getNoun(
                      number,
                      oneMan,
                      twoMen,
                      fiveMen
                  )} ${withYou}`
                : `Никто ${withYou} не тусанет`;

        return phrase;
    };

    const bgColor = length !== 0 ? "primary" : "danger";

    return (
        <span className={`m-2 badge bg-${bgColor}`}>
            {renderPhrase(length)}
        </span>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
