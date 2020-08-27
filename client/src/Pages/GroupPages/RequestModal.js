import React, { useEffect } from "react";
import { connect } from "react-redux";
import ScrollModal from "../../Components/modal/ScrollModal.component";
import Actions from "../../Actions";
import Loader from "../../Components/Loader";
import GroupMemberList from "./GroupMemberList";
import { Redirect } from "react-router-dom";
const { addMember, getRequests, setReducer } = Actions;

const RequestModal = ({ getRequests, auth_id, history, requests, match }) => {
  const { id } = match.params;
  useEffect(() => {
    setReducer({ type: "GET_GROUP", payload: null });
    getRequests(id);
  }, []);
  const renderAction = (id) => {
    return (
      <button
        className="ui blue button"
        onClick={() => addMember(id, requests._id)}
      >
        Add
      </button>
    );
  };
  console.log(requests);
  const onDissmiss = () => {
    return history.goBack();
  };
  if (!requests) return <Loader />;
  if (requests.group_admin_id !== auth_id) return <Redirect to="/expired" />;
  return (
    <ScrollModal
      header="Group Request"
      content={
        <GroupMemberList data={requests.requests} renderAction={renderAction} />
      }
      onDismiss={onDissmiss}
    />
  );
};

const mapStatetoProps = (state) => {
  return {
    requests: state.group.requests,
    auth_id: state.Authentication.id,
  };
};
export default connect(mapStatetoProps, {
  getRequests,
  setReducer,
})(RequestModal);
