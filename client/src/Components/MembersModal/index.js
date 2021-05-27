import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeMember, getMembers, setReducer } from "../../Actions";

import ScrollModal from "../modal/ScrollModal.component";
import RemoveBtn from "../RemoveBtn";
import Loader from "../Loader";
import GroupMemberList from "../GroupMemberList";

const RequestModal = ({ auth_id, members, history, getMembers, match }) => {
  const { id } = match.params;
  useEffect(() => {
    getMembers(id);
  }, [id, getMembers]);
  const renderAction = (id) => {
    if (members.group_admin_id === auth_id) {
      return (
        <RemoveBtn
          title="Remove"
          onClick={() => removeMember(members._id, id)}
        />
      );
    }
  };
  const onDissmiss = () => {
    return history.goBack();
  };
  if (!members) return <Loader />;
  if (members.group_admin_id !== auth_id) return <Redirect to="/expired" />;
  return (
    <ScrollModal
      header="Group Members"
      content={
        <GroupMemberList
          empty_msg="Found no Members"
          data={members.members}
          renderAction={renderAction}
        />
      }
      onDismiss={onDissmiss}
    />
  );
};

const mapStatetoProps = (state) => {
  return {
    members: state.group.members,
    auth_id: state.Authentication.id,
  };
};
export default connect(mapStatetoProps, {
  setReducer,
  getMembers,
})(RequestModal);
