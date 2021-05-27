import React from "react";
import PropTypes from "prop-types";

const GroupModalBtn = ({ title, onClick }) => {
  return (
    <button className="ui blue button" onClick={onClick}>
      {title}
    </button>
  );
};
GroupModalBtn.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GroupModalBtn;
