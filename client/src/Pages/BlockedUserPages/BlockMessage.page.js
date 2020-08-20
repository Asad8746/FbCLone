import React, { useEffect } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
import { Redirect } from "react-router-dom";
import BlockMessage from "./BlockMessage";
const { setReducer } = Actions;

const BlockMessagePage = ({ blockObj, setReducer }) => {
  useEffect(() => {
    return () => {
      setReducer({
        type: "CHECK_IS_BLOCKED",
        payload: {
          blockedStatus: false,
          blockLoader: true,
          message: null,
          userIsBlocked: null,
          blockedByUser: null,
        },
      });
    };
  }, []);
  const { message, blockedByUser, userIsBlocked } = blockObj;
  if ((!userIsBlocked || !blockedByUser) && !message)
    return <Redirect to="/expired" />;
  if (userIsBlocked && message) {
    return <BlockMessage message={message} renderLink={true} />;
  }
  if (blockedByUser && message) {
    return <BlockMessage message={message} renderLink={false} />;
  }
  return <div>message</div>;
};
const mapStateToProps = (state) => {
  return { blockObj: state.blocked };
};
export default connect(mapStateToProps, { setReducer })(BlockMessagePage);
