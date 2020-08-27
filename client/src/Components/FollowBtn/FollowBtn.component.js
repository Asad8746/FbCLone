import React, { useEffect, useState } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
const { followProfile, unfollowProfile, checkFollower } = Actions;

// importing Style Module

const FollowBtn = ({ id, followProfile, unfollowProfile }) => {
  const [isFollower, setIsFollower] = useState(null);
  useEffect(() => {
    if (id) {
      checkFollower(id, setIsFollower);
    }
  }, []);
  useEffect(() => {}, [isFollower]);
  if (isFollower === null) {
    return <div>loading</div>;
  }
  return !isFollower ? (
    <button
      className="ui blue button"
      onClick={() => {
        followProfile(id, setIsFollower);
      }}
    >
      Follow
    </button>
  ) : (
    <button
      className="ui blue button"
      onClick={() => {
        unfollowProfile(id, setIsFollower);
      }}
    >
      UnFollow
    </button>
  );
};

export default connect(null, { followProfile, unfollowProfile })(FollowBtn);
