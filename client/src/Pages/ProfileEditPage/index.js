import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { getProfile, setReducer } from "../../Actions";
import history from "../../history";
import { profileTypes } from "../../Reducers/constants";
import DeleteBtn from "../../Components/DeleteBtn";
import CancelBtn from "../../Components/CancelBtn";
import FormField from "../../Components/FormField";
import Loader from "../../Components/Loader";
import SaveBtn from "../../Components/SaveButton";
import "./index.style.scss";

const ProfileEditPage = ({ getProfile, setReducer, profile, handleSubmit }) => {
  useEffect(() => {
    getProfile();
    return () => {
      setReducer({ type: profileTypes.reset });
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
    <div className="pg__container">
      <div className="u-center-text u-margin-bottom-medium">
        <h3 className="profile-edit__heading">
          <i className="settings icon"></i> Profile Settings
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Field
          label="Your New Password"
          placeholder="Password"
          name="password"
          type="password"
          component={FormField}
        />
        <Field
          label="About"
          placeholder="About"
          name="about"
          type="text"
          component={FormField}
        />
        <div className="pg__actions">
          <CancelBtn onCancelClick={() => history.goBack()} />
          <DeleteBtn onDeleteBtnClick={onDeleteClick} />
          <SaveBtn />
        </div>
      </form>
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
