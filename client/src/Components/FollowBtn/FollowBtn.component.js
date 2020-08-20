import React, { useEffect, useState } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
const { followProfile, unfollowProfile, checkFollower } = Actions;

// importing Style Module

const FollowBtn = ({ id, followProfile, unfollowProfile }) => {
  const [isFollower, setIsFollower] = useState(null);
  console.log(id);
  useEffect(() => {
    checkFollower(id, setIsFollower);
  }, [isFollower]);
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

const mapStateToProps = (state) => {
  return {
    followers: state.Profile.followers,
    isfollower: state.isFollower,
  };
};

export default connect(mapStateToProps, { followProfile, unfollowProfile })(
  FollowBtn
);
