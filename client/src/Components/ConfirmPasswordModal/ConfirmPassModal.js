import React, { useState, useEffect } from "react";
import Modal from "../modal/modal.component";
import Actions from "../../Actions";
import { connect } from "react-redux";
const { updateProfile, setReducer, deleteProfile } = Actions;

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
      setReducer({ type: "GET_PROFILE", payload: {} });
    };
  });
  const renderForm = () => {
    return (
      <div className="ui form error">
        <div className="ui field">
          <br />
          <label>Enter Your Password</label>
          <br />
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
          <br />
          {error ? <div className="ui error message">{error}</div> : null}
        </div>
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
      deleteProfile();
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

export default connect(null, { updateProfile, setReducer, deleteProfile })(
  ConfirmPassword
);
