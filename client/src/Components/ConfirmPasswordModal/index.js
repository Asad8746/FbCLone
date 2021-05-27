import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal.component";
import { updateProfile, setReducer, deleteProfile } from "../../Actions";
import { connect } from "react-redux";
import "./index.styles.scss";

import { profileTypes } from "../../Reducers/constants";
const ConfirmPassword = ({
  history,
  location,
  updateProfile,
  setReducer,
  deleteProfile,
}) => {
  const [confirmPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    return () => {
      setReducer({ type: profileTypes.reset });
    };
  });
  const renderForm = () => {
    return (
      <div className="confirm-password__form">
        <label>Enter Your Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            if (error) {
              setError("");
            }
            setPassword(e.target.value);
          }}
        />
        {error ? <div className="ui error message">{error}</div> : null}
      </div>
    );
  };
  const onConfirmClick = () => {
    const { operation } = location.state;
    if (!confirmPassword.length) return setError("Password is required");
    if (error) return setError("");
    if (operation === "update") {
      const { formValues } = location.state;
      updateProfile({ ...formValues, confirmPassword });
    }
    if (operation === "delete") {
      console.log("from modal", confirmPassword);
      deleteProfile(confirmPassword);
    }
  };

  const renderActions = () => {
    return (
      <>
        <button
          className="ui button"
          type="button"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button
          className="ui blue button"
          type="button"
          onClick={onConfirmClick}
        >
          Confirm Password
        </button>
      </>
    );
  };

  return (
    <Modal
      header="Please Enter your Password"
      body={renderForm()}
      actions={renderActions()}
      onDismiss={() => history.goBack()}
    />
  );
};

ConfirmPassword.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  setReducer: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};
export default connect(null, { updateProfile, setReducer, deleteProfile })(
  ConfirmPassword
);
