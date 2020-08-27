import React, { useEffect } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
import BlockUserItem from "./BlockUserItem";
const { getAllBlockedUsers } = Actions;

const BlockedUsers = ({ getAllBlockedUsers, blockedUsers }) => {
  useEffect(() => {
    getAllBlockedUsers();
  }, []);

  return (
    <div className="ui container">
      <div className="ui segment">
        <h3 className="ui center aligned header">BLOCKED USERS</h3>
        <div className="ui middle aligned divided list">
          {blockedUsers.map((item) => {
            return <BlockUserItem user={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { blockedUsers: state.blocked.blockedUsers };
};
export default connect(mapStateToProps, { getAllBlockedUsers })(BlockedUsers);
