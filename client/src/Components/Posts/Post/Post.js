import React, { useState } from "react";
import history from "../../../history";
import Like from "./Like/Like.Component";
import Comment from "./Comment/Comment.Component";
import Actions from "../../../Actions";
import { connect } from "react-redux";
import ReactEmoji from "react-emoji";

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
  let check = false;
  if (
    post.belongsTo === "group" &&
    post.groupId.group_admin_id === authenticatedUserId
  ) {
    check = true;
  }
  if (post.author_id && authenticatedUserId === post.author_id._id) {
    check = true;
  }
  if (
    post.belongsTo === "page" &&
    post.pageId.page_admin_id === authenticatedUserId
  ) {
    check = true;
  }
  return check;
};

// Post Component
const Post = ({
  isMember,
  post,
  authenticatedUserId,
  deletePost,
  deletePagePost,
}) => {
  // State to show Comment box if clicked
  const [commentStyle, setCommentStyle] = useState("none");

  // Extracting fields from Props
  const { belongsTo } = post;
  let name;
  if (belongsTo === "page") {
    name = post.pageId.name;
  } else if (belongsTo === "group" || belongsTo === "") {
    name = ` ${post.author_id.f_name} ${post.author_id.l_name}`;
  }
  let date = new Date(post.date);

  // Functions
  const onDeleteBtnClick = () => {
    if (belongsTo === "page") {
      deletePagePost(post.pageId._id, post._id);
    } else {
      deletePost(post._id);
    }
  };
  const renderComment = () => {
    if (post.belongsTo === "page" || post.belongsTo === "") {
      return (
        <div className="extra content" style={{ display: commentStyle }}>
          {commentStyle === "inline-block" ? (
            <Comment postId={post._id} />
          ) : null}
        </div>
      );
    } else {
      return isMember ? (
        <div className="extra content" style={{ display: commentStyle }}>
          {commentStyle === "inline-block" ? (
            <Comment postId={post._id} />
          ) : null}
        </div>
      ) : null;
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
          <p>{ReactEmoji.emojify(post.description)}</p>
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
          <p>{post.likes} Likes</p>
        </span>
        <span className="right floated">
          <p> {post.comments} Comments</p>
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
      {renderComment()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticatedUserId: state.Authentication.id,
    isMember: state.group.isMember,
  };
};

export default connect(mapStateToProps, { deletePost, deletePagePost })(Post);
