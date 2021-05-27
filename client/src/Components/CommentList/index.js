import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getComments, createComment, deleteComment } from "../../Actions";
import CommentItem from "../CommentItem";
import TextArea from "../TextArea";
import { commentTypes } from "../../Reducers/constants";
import "./index.style.scss";
import { url } from "../../Api";

// Comment Component

const Comment = ({
  postId,
  profile_id,
  name,
  createComment,
  deleteComment,
  commentTotal,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const onDeleteBtnClick = (commentId) => {
    deleteComment(postId, commentId, cb);
  };
  const cb = (type, payload) => {
    setLoading(false);
    switch (type) {
      case commentTypes.getComments:
        return setComments((prev) => [...prev, ...payload]);
      case commentTypes.createComment:
        return setComments((prev) => [...prev, payload]);
      case commentTypes.deleteComment:
        return setComments((prev) => {
          return prev.filter((comment) => {
            return comment._id !== payload;
          });
        });
      default:
        return;
    }
  };
  useEffect(() => {
    getComments(postId, pageNumber, setHasMore, cb);
  }, [pageNumber]);

  const renderComments = () => {
    if (loading) {
      return (
        <div className="loader__container">
          <div className="ui inline medium active loader"></div>
        </div>
      );
    }
    return (
      <>
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              onDeleteClick={onDeleteBtnClick}
            />
          );
        })}
        {hasMore && comments.length < commentTotal && (
          <div
            className="more-btn"
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            <p>View more Comments</p>
          </div>
        )}
      </>
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createComment(postId, commentContent, cb);
    setCommentContent("");
  };
  return (
    <div className="comments">
      <div className="comments__list">{renderComments()}</div>
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="comments__form-avatar">
          <img
            src={`${url}/profile/profile_pic/${profile_id}?${Date.now()}`}
            alt={`${name} Profile Dp`}
          />
        </div>

        <TextArea
          id="comments__input"
          error=""
          value={commentContent}
          placeholder="Enter Your Comment"
          setValue={setCommentContent}
        />
        <div>
          <button className="comments__btn" type="submit">
            <i className="circular comments icon" id="comments-btn-icon"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  profile_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  commentTotal: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => {
  return {
    profile_id: state.Authentication.id,
    name: `${state.Authentication.f_name} ${state.Authentication.l_name}`,
  };
};
export default connect(mapStateToProps, { createComment, deleteComment })(
  Comment
);
