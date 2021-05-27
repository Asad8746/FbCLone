import React, { useEffect } from "react";
import { connect } from "react-redux";

import List from "../List";
import { getFollowers } from "../../Actions";

const FollowersComponent = ({ profileId, followers, getFollowers }) => {
  useEffect(() => {
    getFollowers(profileId);
  }, [profileId, getFollowers]);

  return <List list={followers} />;
};

const mapStateToProps = (state) => {
  return {
    profileId: state.profileReducer.profile._id,
    followers: state.profileReducer.followers,
  };
};

export default connect(mapStateToProps, {
  getFollowers,
})(FollowersComponent);
