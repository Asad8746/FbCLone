import React from "react";
import "./posts.style.scss";
import Post from "./Post/Post";
import FlipMove from "react-flip-move";
let renderPost = (posts, message) => {
  if (posts.length === 0) {
    return <div>{message}</div>;
  }
  return Object.keys(posts).map((key) => {
    return (
      <FlipMove key={posts[key]._id}>
        <div>
          <Post post={posts[key]} />
        </div>
      </FlipMove>
    );
  });
};

const Posts = ({ posts, message }) => {
  return <div className="posts">{renderPost(posts, "List  Empty")}</div>;
};

export default Posts;
