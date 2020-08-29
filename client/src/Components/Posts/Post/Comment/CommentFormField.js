import React from "react";
import FormError from "../../../FormField/FormError.component";

import "./commentForm.style.scss";

const CommentFormField = ({ placeholder, input, meta }) => {
  return (
    <div className="comment-input-container">
      <input className="comment-input" placeholder={placeholder} {...input} />
      <FormError meta={meta} />
    </div>
  );
};

export default CommentFormField;
