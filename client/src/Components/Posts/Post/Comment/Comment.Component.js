import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "../../../../Actions";
import "./commentForm.style.scss";
const { getComments, createComment, deleteComment } = Actions;

// Helper Functions
const renderDeleteButton = (post_id, comment, auth_id, onDeleteBtnClick) => {
  return comment.profile_id._id === auth_id ? (
    <div
      onClick={() => {
        onDeleteBtnClick(post_id, comment._id);
      }}
    >
      Delete
    </div>
  ) : null;
};

// Function for rendering input on the screen
const renderCommentInput = ({ placeholder, input, meta, ...rest }) => {
  return (
    <div className="comment-input-container">
      <input placeholder={placeholder} className="comment-input" {...input} />
      {renderError(meta)}
    </div>
  );
};
const renderError = ({ touched, error }) => {
  if (touched && error) {
    return (
      <div className="ui negative message">
        <p>{error}</p>
      </div>
    );
  }
};

const renderComments = (id, comments, auth_id, onDeleteBtnClick) => {
  if (!comments) {
    return <div className="ui active loader"></div>;
  }
  console.log(id);
  return comments.map((comment) => {
    console.log(comment);
    const { _id, f_name, l_name } = comment.profile_id;
    const date = new Date(comment.date);
    return (
      <div className="comment" key={comment._id}>
        <a className="avatar">
          <img src={`http://localhost:5000/profile/profile_pic/${_id}`} />
        </a>
        <div className="content">
          <Link
            className="author"
            to={`/profile/${_id}`}
          >{`${f_name} ${l_name}`}</Link>
          <div className="metadata">
            <span className="date" style={{ margin: 0 }}>
              {date.toDateString()}
            </span>
          </div>
          <div className="text">{comment.comment}</div>
          {renderDeleteButton(id, comment, auth_id, onDeleteBtnClick)}
        </div>
      </div>
    );
  });
};

// Comment Component

const Comment = ({
  id,
  reset,
  createComment,
  auth_id,
  deleteComment,
  ...rest
}) => {
  const [comments, setComments] = useState(null);
  const onDeleteBtnClick = (id, commentId) => {
    deleteComment(id, commentId, setComments);
  };
  useEffect(() => {
    getComments(id, setComments);
  }, []);

  const onSubmit = (formValues) => {
    const { comment } = formValues;
    createComment(id, comment, comments, setComments);
    reset("commentForm");
  };

  return (
    <div id="comments">
      <div className="ui comments">
        {renderComments(id, comments, auth_id, onDeleteBtnClick)}
      </div>
      <form
        className="form-error"
        onSubmit={rest.handleSubmit(onSubmit)}
        className="comment-form"
      >
        <Field
          name="comment"
          component={renderCommentInput}
          placeholder="Enter your Comment"
        />
        <button id="comment-btn">
          <i class="comments icon" id="comment-btn-icon"></i>
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

const mapStateToProps = (state) => {
  return { auth_id: state.Authentication.id };
};

const commentWrapped = reduxForm({ form: "commentForm", validate })(Comment);
export default connect(mapStateToProps, { createComment, deleteComment })(
  commentWrapped
);
