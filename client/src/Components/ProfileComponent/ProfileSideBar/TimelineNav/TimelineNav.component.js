import React, { useEffect } from "react";
import "./timelineNav.style.scss";
import Actions from "../../../../Actions";
import { connect } from "react-redux";
const { whatToShow } = Actions;
const FollowUser = ({ following, followers, whatToShow }) => {
  useEffect(() => {
    return () => {
      whatToShow("timeline");
    };
  });
  return (
    <div className="follow-container">
      <ul>
        <li
          onClick={() => {
            whatToShow("timeline");
          }}
        >
          TimeLine
        </li>
        <li onClick={() => whatToShow("followers")}>
          {followers} {followers in [1, 0] ? "Follower" : "Followers"}
        </li>
        <li onClick={() => whatToShow("following")}>
          {following} {following in [1, 0] ? "Following" : "Followings"}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followers: state.profileReducer.profile.followers,
    following: state.profileReducer.profile.following,
  };
};

export default connect(mapStateToProps, { whatToShow })(FollowUser);
