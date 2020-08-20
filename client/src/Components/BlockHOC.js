import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import Actions from "../Actions";
import BlockMessagePage from "../Pages/BlockedUserPages/BlockMessage.page";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
// import Loader from "./Loader";
const { checkBlocked } = Actions;

const BlockHighOrderComponent = ({
  match,
  blockedObj,
  checkBlocked,
  history,
}) => {
  const { id } = match.params;
  const { blockLoader, blockedStatus, message } = blockedObj;
  useEffect(() => {
    checkBlocked(id);
  }, []);
  console.log(blockLoader, blockedStatus);
  useEffect(() => {}, [blockLoader]);
  if (blockLoader) return <Loader />;
  if (blockedStatus) return <BlockMessagePage />;
  return <ProfilePage match={match} />;
};

const mapStateToProps = (state) => {
  return { blockedObj: state.blocked };
};
export default connect(mapStateToProps, { checkBlocked })(
  BlockHighOrderComponent
);
