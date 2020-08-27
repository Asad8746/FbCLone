import React, { useEffect } from "react";
import { connect } from "react-redux";
import ScrollModal from "../../Components/modal/ScrollModal.component";
import RemoveBtn from "../../Components/RemoveBtn/RemoveBtn.component";

import Actions from "../../Actions";
import Loader from "../../Components/Loader";
import GroupMemberList from "./GroupMemberList";
import { Redirect } from "react-router-dom";
const { removeMember, getMembers, setReducer } = Actions;

const RequestModal = ({ auth_id, members, history, getMembers, match }) => {
  const { id } = match.params;
  useEffect(() => {
    setReducer({ type: "GET_GROUP", payload: null });
    getMembers(id);
  }, []);
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
        <GroupMemberList data={members.members} renderAction={renderAction} />
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
