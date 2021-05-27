import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const CommentDeleteBtn = ({ auth_id, comment, onDeleteClick }) => {
  return (
    <>
      {comment.author._id === auth_id ? (
        <div
          onClick={() => {
            onDeleteClick(comment._id);
          }}
          className="comment-item__delete-btn"
          style={{ cursor: "pointer" }}
        >
          Delete
        </div>
      ) : null}
    </>
  );
};

CommentDeleteBtn.propTypes = {
  auth_id: PropTypes.string.isRequired,
  comment: PropTypes.object,
  onDeleteClick: PropTypes.func,
};
const mapStateToProps = (state) => {
  return { auth_id: state.Authentication.id };
};

export default connect(mapStateToProps)(CommentDeleteBtn);
