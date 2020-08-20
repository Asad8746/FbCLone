import React from "react";

const CancelBtn = ({ onCancelClick }) => {
  return (
    <button
      className="pageBtn animateBtn"
      type="button"
      onClick={onCancelClick}
    >
      <i class="arrow left icon btnIcon"></i>
    </button>
  );
};

export default CancelBtn;
