import React, { useState } from "react";
import { connect } from "react-redux";

import Posts from "../Posts";
import CreatePostForm from "../CreatePostForm";
import TimelineNavComponent from "../TimelineNav";
import FollowerComponent from "../FollowerList";
import FollowingComponent from "../FollowingList";
import ProfileAbout from "../ProfileAbout";
import "./index.style.scss";

const TimeLine = ({ isUser, urlToPost, profileId }) => {
  const [display, setDisplay] = useState(1); // 1 represents Posts 2 respresents Followers and 3 represents Following 4 represents About
  const renderContent = () => {
    switch (display) {
      case 1:
        return (
          <>
            {isUser ? <CreatePostForm urlToPost={urlToPost} /> : null}
            <Posts type="profile" id={profileId} />
          </>
        );
      case 2:
        return <FollowerComponent id={profileId} />;
      case 3:
        return <FollowingComponent id={profileId} />;
      case 4:
        return <ProfileAbout />;
      default:
        return;
    }
  };
  return (
    <>
      <TimelineNavComponent display={display} setDisplay={setDisplay} />
      {renderContent()}
    </>
  );
};
const mapStateToProps = (state) => {
  return { profileId: state.profileReducer.profile._id, isUser: state.isUser };
};
export default connect(mapStateToProps)(TimeLine);
