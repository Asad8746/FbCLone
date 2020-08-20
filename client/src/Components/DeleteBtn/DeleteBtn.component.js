import React from "react";

const DeleteBtn = ({ onDeleteBtnClick }) => {
  return (
    <button
      type="button"
      className="pageBtn animateBtn delete-btn"
      onClick={onDeleteBtnClick}
    >
      <i class="trash icon btnIcon" id="delete-icon"></i>
    </button>
  );
};

export default DeleteBtn;
