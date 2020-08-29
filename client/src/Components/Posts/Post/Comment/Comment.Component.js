import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";

import { connect } from "react-redux";
import CommentFormField from "./CommentFormField";
import Actions from "../../../../Actions";
import CommentItem from "./CommentItem";
import "./commentForm.style.scss";
const { getComments, createComment, deleteComment } = Actions;

// Function for rendering input on the screen

const renderComments = (comments, onDeleteClick) => {
  if (!comments) {
    return <div className="ui active loader"></div>;
  }
  return comments.map((comment) => {
    return <CommentItem comment={comment} onDeleteClick={onDeleteClick} />;
  });
};

// Comment Component

const Comment = ({
  postId,
  reset,
  createComment,
  deleteComment,
  handleSubmit,
}) => {
  const [comments, setComments] = useState(null);
  const onDeleteBtnClick = (commentId) => {
    deleteComment(postId, commentId, setComments);
  };
  useEffect(() => {
    getComments(postId, setComments);
  }, []);

  const onSubmit = (formValues) => {
    const { comment } = formValues;

    createComment(postId, comment, comments, setComments);
    reset("commentForm");
  };
  return (
    <div id="comments">
      <div className="ui comments">
        {renderComments(comments, onDeleteBtnClick)}
      </div>
      <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="comment"
          component={CommentFormField}
          placeholder="Enter your Comment"
        />
        <button id="comment-btn" type="submit">
          <i className="comments icon" id="comment-btn-icon"></i>
        </button>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  let errors = {};
  if (!formValues.comment) {
    errors.comment = "Comment is not suppose to be Empty";
  }
  return errors;
};

const commentWrapped = reduxForm({ form: "commentForm", validate })(Comment);
export default connect(null, { createComment, deleteComment })(commentWrapped);
