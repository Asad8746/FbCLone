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
          {followers.length} Followers
        </li>
        <li onClick={() => whatToShow("following")}>
          {following.length} Following
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followers: state.Profile.followers,
    following: state.Profile.following,
  };
};

export default connect(mapStateToProps, { whatToShow })(FollowUser);
