import React from "react";
import history from "../../history";

import "./index.style.scss";

const CancelBtn = () => {
  return (
    <button
      className="pg__btn animateBtn cancel-btn"
      type="button"
      onClick={() => history.goBack()}
    >
      <i className="arrow left icon cancel-icon"></i>
    </button>
  );
};

export default CancelBtn;
