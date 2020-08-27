import React, { useEffect } from "react";
import ProfileEditHeader from "./ProfileEditHeader";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import DeleteBtn from "../../Components/DeleteBtn/DeleteBtn.component";
import CancelBtn from "../../Components/CancelBtn/CancelBtn.component";
import FormField from "../../Components/FormField/FormField.component";
import Loader from "../../Components/Loader";

import Actions from "../../Actions";
import history from "../../history";

const { getProfile, setReducer } = Actions;

const ProfileEditPage = ({ getProfile, setReducer, profile, handleSubmit }) => {
  useEffect(() => {
    getProfile();
    return () => {
      setReducer({ type: "GET_PROFILE", payload: {} });
    };
  }, []);
  if (Object.keys(profile).length === 0) {
    return <Loader />;
  }

  const onSubmit = (formValues) => {
    history.push("/confirm", { formValues, operation: "update" });
  };
  const onDeleteClick = () => {
    history.push("/confirm", { operation: "delete" });
  };
  return (
    <div className="ui container">
      <div className="ui segment">
        <ProfileEditHeader />
        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <div className="required field">
            <label>Your New Name</label>
            <div className="two fields">
              <Field
                name="f_name"
                type="text"
                component={FormField}
                placeholder="First Name"
              />
              <Field
                name="l_name"
                type="text"
                component={FormField}
                placeholder="Last Name"
              />
            </div>
          </div>
          <Field
            label="Your New Password"
            placeholder="Password"
            name="password"
            type="password"
            required={true}
            component={FormField}
          />
          <Field
            label="About"
            placeholder="About"
            name="about"
            type="text"
            required={true}
            component={FormField}
          />
          <div className="page-settings-actions-container">
            <CancelBtn onCancelClick={() => history.goBack()} />
            <DeleteBtn onDeleteBtnClick={onDeleteClick} />
            <button className="pageBtn save-btn animateBtn" type="submit">
              <i className="save icon btnIcon" id="save-icon"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const profile = state.profileReducer.profile;
  return { initialValues: profile, profile };
};

const formWrapped = reduxForm({
  form: "ProfileEditPage",
  enableReinitialize: true,
})(ProfileEditPage);

export default connect(mapStateToProps, { getProfile, setReducer })(
  formWrapped
);
