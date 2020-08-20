import React, { useState, useEffect } from "react";
import Actions from "../../../../Actions";
import { connect } from "react-redux";
const { likePost, disLikePost } = Actions;
const renderIcon = (text, action) => {
  return (
    <span
      className="left floated like"
      id="Like"
      onClick={() => {
        action();
      }}
    >
      <i className="thumbs up outline icon"></i>
      {text}
    </span>
  );
};

const Like = ({ post, profile_id, likePost, disLikePost }) => {
  const [postisLiked, setPostisLiked] = useState(false);
  const onLikeClick = () => {
    likePost(post._id);
    setPostisLiked(true);
  };
  const ondisLikeClick = () => {
    disLikePost(post._id);
    setPostisLiked(false);
  };

  const checkLike = () => {
    let check = post.likes.find((profile) => {
      return profile._id === profile_id;
    });
    if (check) {
      setPostisLiked(true);
    }
  };
  useEffect(() => {
    checkLike();
  }, []);

  return (
    <div>
      {postisLiked
        ? renderIcon("dislike", ondisLikeClick)
        : renderIcon("Like", onLikeClick)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile_id: state.Authentication.id };
};

export default connect(mapStateToProps, { likePost, disLikePost })(Like);
