import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactEmoji from "react-emoji";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import history from "../../history";
import Like from "../Like";
import Comment from "../CommentList";
import { deletePost } from "../../Actions";

import { url } from "../../Api";

import "./post.style.scss";

// Post Component
const Post = ({ post, isAdmin, auth_id, deletePost }) => {
  const [showComment, setShowComment] = useState(false);
  const { belongsTo } = post;
  let date = new Date(post.date);

  const showDeleteButton = () => {
    let check = false;
    if (isAdmin || auth_id === post.author_id._id) {
      check = true;
    }
    if (post.belongsTo === "page" && post.author_id.page_admin_id === auth_id) {
      check = true;
    }
    return check;
  };
  const showEditButton = () => {
    let check = false;
    if (auth_id === post.author_id._id) {
      check = true;
    }
    if (post.belongsTo === "page" && post.author_id.page_admin_id === auth_id) {
      check = true;
    }
    return check;
  };
  const onAuthorClick = (e) => {
    e.stopPropagation();
    if (belongsTo === "page") {
      return history.push(`/pages/${post.pageI._id}`);
    }
    return history.push(`/profile/${post.author_id._id}`);
  };

  const imgSrc =
    belongsTo === "page"
      ? `${url}/pages/${post.author_id._id}/cover?${Date.now()}`
      : `${url}/profile/profile_pic/${post.author_id._id}?${Date.now()}`;
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header__left">
          <div className="post__avatarContainer">
            <img className="post__userAvatar" src={imgSrc} alt="avatar" />
          </div>
          <div className="post__InfoContainer">
            <h3 onClick={onAuthorClick}>{post.author_name}</h3>
            <p>{date.toDateString()}</p>
          </div>
        </div>

        <div className="post__header__right">
          {showEditButton() && (
            <Link to={`/post/${post._id}`}>
              <i className="edit rounded icon" id="post__icon"></i>
            </Link>
          )}
          {showDeleteButton(post, auth_id) && (
            <i
              onClick={() => deletePost(post._id)}
              className="trash rounded icon"
              id="post__icon"
            ></i>
          )}
        </div>
      </div>
      <div>
        <div className="post__description">
          {ReactEmoji.emojify(post.description)}
        </div>
      </div>
      {post.hasImage ? (
        <img
          src={`${url}/posts/post_pic/${post._id}`}
          className="post__image"
          alt={post.description}
        />
      ) : null}
      <div className="post__actionsContainer">
        <span className="post__likeContainer">
          <Like id={post._id} likes={post.likes} />
        </span>
        <span className="post__commentContainer">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowComment((prevState) => !prevState)}
          >
            <i className="comment outline icon" id="comment-icon"></i>
            <p style={{ display: "inline-block" }}>
              {post.comments}{" "}
              {post.comments === 0 || post.comments === 1
                ? "Comment"
                : "Comments"}
            </p>
          </span>
        </span>
      </div>
      {showComment && (
        <Comment postId={post._id} commentTotal={post.comments} />
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  auth_id: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth_id: state.Authentication.id,
    isMember: state.group.isMember,
    isAdmin: state.group.isAdmin,
  };
};

export default connect(mapStateToProps, { deletePost })(Post);
