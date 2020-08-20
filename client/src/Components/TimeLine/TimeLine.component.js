import React from "react";
import Posts from "../Posts/PostsList.component";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import "./timeline.style.scss";

const TimeLine = ({ isAuthUser, posts, urlToPost }) => {
  return (
    <>
      <div>{isAuthUser ? <CreatePostForm urlToPost={urlToPost} /> : null}</div>
      <Posts posts={posts} />
    </>
  );
};

export default TimeLine;
