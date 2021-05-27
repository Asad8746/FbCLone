import React, { useState, useEffect } from "react";
import { likePost, disLikePost, checkLike } from "../../Actions";
import { connect } from "react-redux";
import "./index.scss";
const likeContainer = {};
const Like = ({ id, likes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [postisLiked, setPostisLiked] = useState(false);
  const cb = (likeStatus, updateLikeCount) => {
    if (likeCount !== updateLikeCount) {
      setLikeCount(updateLikeCount);
    }
    if (likeStatus !== postisLiked) {
      setPostisLiked(likeStatus);
    }
  };
  const onClick = () => {
    if (postisLiked) {
      setLikeCount((prev) => prev - 1);
      setPostisLiked(false);
      return disLikePost(id, cb);
    }
    setLikeCount((prev) => prev + 1);
    setPostisLiked(true);
    return likePost(id, cb);
  };
  useEffect(() => {
    checkLike(id, setPostisLiked);
  }, []);

  return (
    <>
      <div className="like" style={likeContainer} onClick={onClick}>
        {postisLiked ? (
          <i className="like__icon heart icon"></i>
        ) : (
          <i
            id="like__icon"
            className="heart outline icon"
            style={{ fontSize: 18 }}
          ></i>
        )}
        <p style={{ display: "inline-block" }}>
          {likeCount} {likeCount === 0 || likeCount === 1 ? "Like" : "Likes"}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { profile_id: state.Authentication.id };
};

export default connect(mapStateToProps)(Like);
