import React from "react";
import { connect } from "react-redux";

const CommentDeleteBtn = ({ auth_id, comment, onDeleteClick }) => {
  return (
    <>
      {comment.profile_id._id === auth_id ? (
        <div
          onClick={() => {
            onDeleteClick(comment._id);
          }}
          className="actions"
        >
          Delete
        </div>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return { auth_id: state.Authentication.id };
};

export default connect(mapStateToProps)(CommentDeleteBtn);
