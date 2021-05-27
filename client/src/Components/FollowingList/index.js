import React, { useEffect } from "react";
import List from "../List";
import { getFollowing } from "../../Actions";

import { connect } from "react-redux";

const FollowingComponent = ({ profileId, following, getFollowing }) => {
  useEffect(() => {
    getFollowing(profileId);
  }, [profileId, getFollowing]);

  return <List list={following} />;
};

const mapStateToProps = (state) => {
  return {
    profileId: state.profileReducer.profile._id,
    following: state.profileReducer.following,
  };
};

export default connect(mapStateToProps, {
  getFollowing,
})(FollowingComponent);
