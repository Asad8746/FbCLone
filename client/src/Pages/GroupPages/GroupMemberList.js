import React from "react";
import { connect } from "react-redux";

const GroupMemberList = ({ data, authId, group_admin_id, renderAction }) => {
  console.log(authId);
  const renderItem = (item) => {
    console.log(item._id === group_admin_id);
    return (
      <div className="item" key={item._id}>
        {group_admin_id === item._id ? (
          <div className="right floated content">
            <div className="ui large red label">Admin</div>
          </div>
        ) : (
          <div className="right floated content">{renderAction(item._id)}</div>
        )}
        <img
          className="ui avatar image"
          src={`http://localhost:5000/profile/profile_pic/${item._id}`}
          alt={`${item.name} Profile Dp`}
        />
        <div className="content">{item.name}</div>
      </div>
    );
  };
  return (
    <div className="ui middle aligned divided list">
      {data.map((item) => {
        return renderItem(item);
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  let group_admin_id;
  if (state.group.members) {
    group_admin_id = state.group.members.group_admin_id;
  } else if (state.requests.requests) {
    group_admin_id = state.group.requests.group_admin_id;
  }
  return {
    authId: state.Authentication.id,
    group_admin_id,
  };
};

export default connect(mapStateToProps)(GroupMemberList);
