import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { addMember, getRequests, setReducer } from "../../Actions";

import ScrollModal from "../modal/ScrollModal.component";
import Loader from "../Loader";
import GroupMemberList from "../GroupMemberList";

const RequestModal = ({ getRequests, auth_id, history, requests, match }) => {
  const { id } = match.params;
  useEffect(() => {
    getRequests(id);
  }, [id, getRequests]);
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

  const onDissmiss = () => {
    return history.goBack();
  };
  if (!requests) return <Loader />;
  if (requests.group_admin_id !== auth_id) return <Redirect to="/expired" />;
  return (
    <ScrollModal
      header="Group Request"
      content={
        <GroupMemberList
          empty_msg="Found no Requests"
          data={requests.requests}
          renderAction={renderAction}
        />
      }
      onDismiss={onDissmiss}
    />
  );
};
RequestModal.propTypes = {
  getRequests: PropTypes.func.isRequired,
  auth_id: PropTypes.string.isRequired,
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
