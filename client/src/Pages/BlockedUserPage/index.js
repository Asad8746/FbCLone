import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllBlockedUsers, setReducer } from "../../Actions";
import BlockUserItem from "../../Components/BlockItem";
import { blockTypes } from "../../Reducers/constants";
import "./index.style.scss";

const BlockedUsers = ({
  blockedUsers,
  blockLoader,
  getAllBlockedUsers,
  setReducer,
}) => {
  useEffect(() => {
    getAllBlockedUsers();
    return () => {
      setReducer({ type: blockTypes.reset });
    };
  }, [setReducer]);
  return (
    <div className="blocked__container">
      <h3 className="ui center aligned header">BLOCKED USERS</h3>
      {blockLoader ? (
        <div className="u-center-text">
          <div className="ui active small inline loader"></div>
        </div>
      ) : blockedUsers.length === 0 ? (
        <div className="blocked__empty">Found No Blocked Users</div>
      ) : (
        blockedUsers.map((item) => {
          return <BlockUserItem key={item._id} user={item} />;
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blockedUsers: state.blocked.blockedUsers,
    blockLoader: state.blocked.blockLoader,
  };
};
export default connect(mapStateToProps, { getAllBlockedUsers, setReducer })(
  BlockedUsers
);
