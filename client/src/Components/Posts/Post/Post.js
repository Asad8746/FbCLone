import React, { useState, useEffect } from "react";
import history from "../../../history";
import Like from "./Like/Like.Component";
import Comment from "./Comment/Comment.Component";
import Actions from "../../../Actions";
import { connect } from "react-redux";

import "./post.style.scss";
import { Link } from "react-router-dom";
const { deletePost, deletePagePost } = Actions;

// helpers
const showComment = (commentStyle, setCommentStyle) => {
  commentStyle === "none"
    ? setCommentStyle("inline-block")
    : setCommentStyle("none");
};
const showDeleteButton = (post, authenticatedUserId) => {
  if (post.author_id) {
    return authenticatedUserId === post.author_id._id;
  }
  if (post.belongsTo === "page") {
    return post.belongsToId.page_admin_id === authenticatedUserId;
  }
};

// Post Component
const Post = ({ post, authenticatedUserId, deletePost, deletePagePost }) => {
  // State to show Comment box if clicked
  const [commentStyle, setCommentStyle] = useState("none");

  // Extracting fields from Props
  const { belongsTo } = post;
  const name =
    belongsTo === "page"
      ? post.belongsToId.page_name
      : ` ${post.author_id.f_name} ${post.author_id.l_name}`;
  let date = new Date(post.date);

  // Functions
  const onDeleteBtnClick = () => {
    if (belongsTo === "page") {
      deletePagePost(post.belongsToId._id, post._id);
    } else {
      deletePost(post._id);
    }
  };
  return (
    <div className="ui card" id="post">
      <div
        className="ui header"
        id="header"
        onClick={(e) => {
          e.stopPropagation();
          if (belongsTo === "page")
            return history.push(`/pages/${post.belongsToId._id}`);
          return history.push(`/profile/${post.author_id._id}`);
        }}
      >
        {name}
      </div>
      <div>
        {showDeleteButton(post, authenticatedUserId) ? (
          <span className="right floated" id="icons-container">
            <Link to={`/post/${post._id}`}>
              <i className="edit icon" id="post-icon"></i>
            </Link>
            <i
              onClick={onDeleteBtnClick}
              className="trash icon"
              id="post-icon"
            ></i>
          </span>
        ) : null}
        <div className="description">
          <p>{post.description}</p>
        </div>
        <div className="meta date">{date.toDateString()}</div>
      </div>
      {post.hasImage ? (
        <img
          src={`http://localhost:5000/posts/post_pic/${post._id}`}
          className="post__image"
          alt={post.description}
        />
      ) : null}
      <div className="extra content extra-content">
        <span className="left floated">
          <p>{post.likes.length} Likes</p>
        </span>
        <span className="right floated">
          <p> {post.comments.length} Comments</p>
        </span>
      </div>
      <div className="extra content">
        <Like post={post} />
        <span
          className="right floated star"
          id="comment"
          onClick={() => {
            showComment(commentStyle, setCommentStyle);
          }}
        >
          <i className="comment outline icon  "></i>
          Comment
        </span>
      </div>
      <div className="extra content" style={{ display: commentStyle }}>
        {commentStyle === "inline-block" ? <Comment id={post._id} /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticatedUserId: state.Authentication.id,
  };
};

export default connect(mapStateToProps, { deletePost, deletePagePost })(Post);
