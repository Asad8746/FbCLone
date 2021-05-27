import React from "react";
import { connect } from "react-redux";
import "./index.style.scss";

const TimeLineNavigation = ({ following, followers, display, setDisplay }) => {
  // label can be 1:Posts,2:Followers,3:Following,4:About
  const selectActiveElement = (label) => {
    return display === label ? "active" : "";
  };
  const onClick = (value) => {
    if (value === display) return;
    setDisplay(value);
  };

  return (
    <div className="timeline">
      <ul className="timeline__nav">
        <li
          onClick={() => onClick(1)}
          className={`${selectActiveElement(1)} timeline__nav-item`}
        >
          TimeLine
        </li>
        <li
          onClick={() => onClick(2)}
          className={`${selectActiveElement(2)} timeline__nav-item`}
        >
          {followers} {followers in [1, 0] ? "Follower" : "Followers"}
        </li>
        <li
          onClick={() => onClick(3)}
          className={`${selectActiveElement(3)} timeline__nav-item`}
        >
          {following} {following in [1, 0] ? "Following" : "Followings"}
        </li>
        <li
          onClick={() => onClick(4)}
          className={`${selectActiveElement(4)} timeline__nav-item`}
        >
          About
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

export default connect(mapStateToProps)(TimeLineNavigation);
