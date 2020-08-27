import React, { useEffect } from "react";
import List from "../../Components/ProfileComponent/FollowerList.component";
import Actions from "../../Actions";

import { connect } from "react-redux";

import Loader from "../../Components/Loader";

const { getFollowers } = Actions;
const FollowersComponent = ({ id, followers, getFollowers }) => {
  useEffect(() => {
    getFollowers(id);
  }, []);
  if (!followers) return <Loader />;
  return <List list={followers} />;
};

const mapStateToProps = (state) => {
  return {
    followers: state.profileReducer.followers,
  };
};

export default connect(mapStateToProps, {
  getFollowers,
})(FollowersComponent);
