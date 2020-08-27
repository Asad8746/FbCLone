import React, { useEffect } from "react";
import List from "../../Components/ProfileComponent/FollowerList.component";
import Actions from "../../Actions";

import { connect } from "react-redux";

import Loader from "../../Components/Loader";

const { getFollowing } = Actions;
const FollowingComponent = ({ id, following, getFollowing }) => {
  useEffect(() => {
    getFollowing(id);
  }, []);
  if (!following) return <Loader />;
  return <List list={following} />;
};

const mapStateToProps = (state) => {
  return {
    following: state.profileReducer.following,
  };
};

export default connect(mapStateToProps, {
  getFollowing,
})(FollowingComponent);
