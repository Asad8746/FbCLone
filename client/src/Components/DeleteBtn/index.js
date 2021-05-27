import React from "react";
import "./index.styles.scss";
const DeleteBtn = ({ onDeleteBtnClick }) => {
  return (
    <button
      type="button"
      className="pg__btn animateBtn delete-btn"
      onClick={onDeleteBtnClick}
    >
      <i className="trash icon icon"></i>
    </button>
  );
};

export default DeleteBtn;
