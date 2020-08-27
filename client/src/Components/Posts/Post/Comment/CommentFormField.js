import React from "react";

import "./commentForm.style.scss";

const CommentFormField = ({ placeholder }) => {
  return (
    <div className="comment-input-container">
      <input className="comment-input" placeholder={placeholder} />
    </div>
  );
};

export default CommentFormField;
