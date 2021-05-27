import React from "react";
import PropTypes from "prop-types";

import "./index.style.scss";
const BlockMessage = ({ message }) => {
  return (
    <div className="block__container">
      <p className="block__message">{message}</p>
    </div>
  );
};
BlockMessage.defaultProps = {
  message: "",
};

BlockMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default BlockMessage;
