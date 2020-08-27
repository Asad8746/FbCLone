import React from "react";
import { Link } from "react-router-dom";
import CommentDeleteBtn from "./CommentDeleteBtn";

const CommentItem = ({ comment, onDeleteClick }) => {
  const { _id, f_name, l_name } = comment.profile_id;
  const date = new Date(comment.date);
  return (
    <div className="comment" key={comment._id}>
      <div className="avatar">
        <img
          src={`http://localhost:5000/profile/profile_pic/${_id}`}
          alt={`${f_name} ${l_name} Profile Dp`}
        />
      </div>
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
        <CommentDeleteBtn comment={comment} onDeleteClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default CommentItem;
