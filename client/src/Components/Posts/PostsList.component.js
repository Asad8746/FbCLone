import React from "react";
import "./posts.style.scss";
import Post from "./Post/Post";
let renderPost = (posts, message) => {
  if (posts.length === 0) {
    return <div>{message}</div>;
  }
  return Object.keys(posts).map((key) => {
    return (
      <div key={posts[key]._id}>
        <Post post={posts[key]} />
      </div>
    );
  });
};

const Posts = ({ posts, message }) => {
  console.log(posts);
  return <div className="posts">{renderPost(posts, "List  Empty")}</div>;
};

export default Posts;
