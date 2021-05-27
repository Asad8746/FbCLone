import React from "react";
import { Link } from "react-router-dom";
import ReactEmoji from "react-emoji";
import CommentDeleteBtn from "../CommentDeleteBtn";
import PropTypes from "prop-types";
import moment from "moment";
import { url } from "../../Api";
import "./index.style.scss";

const CommentItem = ({ comment, onDeleteClick }) => {
  const { _id, f_name, l_name } = comment.author;
  const date = new Date(comment.date);
  return (
    <div className="comment-item">
      <div className="comment-item__avatar">
        <img
          src={`${url}/profile/profile_pic/${_id}`}
          alt={`${f_name} ${l_name} Profile Dp`}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="comment-item__content">
          <Link
            className="author"
            to={`/profile/${_id}`}
          >{`${f_name} ${l_name}`}</Link>
          <div className="comment-item__text">
            {ReactEmoji.emojify(comment.comment)}
          </div>
        </div>
        <div className="comment-item__actions">
          <CommentDeleteBtn comment={comment} onDeleteClick={onDeleteClick} />{" "}
          <span className="comment-item__date">{moment(date).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.object,
  onDeleteClick: PropTypes.func,
};

export default CommentItem;
