import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setReducer } from "../../Actions";
import { Redirect } from "react-router-dom";
import BlockMessage from "../../Components/BlockContainer";
import { blockTypes } from "../../Reducers/constants";

const BlockMessagePage = ({ message, setReducer }) => {
  useEffect(() => {
    return () => {
      setReducer({
        type: blockTypes.reset,
      });
    };
  }, [setReducer]);
  if (!message) return <Redirect to="/expired" />;
  if (message) {
    return <BlockMessage message={message} />;
  }

  return <></>;
};
const mapStateToProps = (state) => {
  return { message: state.blocked.message };
};
export default connect(mapStateToProps, { setReducer })(BlockMessagePage);
