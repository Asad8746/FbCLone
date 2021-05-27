import React, { useEffect } from "react";
import { getGroup, resetGroups, updateGroup, deleteGroup } from "../../Actions";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DeleteBtn from "../../Components/DeleteBtn";
import { Redirect } from "react-router-dom";
import CancelBtn from "../../Components/CancelBtn";
import SaveBtn from "../../Components/SaveButton";

import FormField from "../../Components/FormField";
import Loader from "../../Components/Loader";
import RadioBtn from "../../Components/FormField/RadioButton";

/* A function for validation which 
  will check that group_name and group_description 
  is required.
*/
const validate = (formValues) => {
  let errors = {};
  if (!formValues.name) {
    errors.name = "Group Name is required";
  }
  if (!formValues.description) {
    errors.description = "Group Description is required";
  }
  return errors;
};

const PageSettings = ({
  group,
  match,
  history,
  handleSubmit,
  getGroup,
  deleteGroup,
  isAdmin,
}) => {
  const { id } = match.params;
  useEffect(() => {
    getGroup(id);
    return () => {
      resetGroups();
    };
  }, [id]);
  const onSubmit = ({ name, description, privacy }) => {
    if (
      name === group.name &&
      description === group.description &&
      privacy === group.privacy
    ) {
      return history.push(`/groups/${group.id}`);
    }
    updateGroup(group.id, { name, description, privacy });
  };
  if (!group) {
    return <Loader />;
  }
  if (!isAdmin) return <Redirect to="/expired" />;
  return (
    <div className="pg__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={FormField}
          label="Group Name"
          type="text"
          name="name"
          placeholder="Enter New Group Name"
          required={true}
        />
        <Field
          component={FormField}
          label="Group Description"
          type="text"
          name="description"
          placeholder="Enter New Group Description"
          required={true}
        />

        <div className="form-field">
          <label className="radio__label">Privacy</label>
          <Field
            name="privacy"
            component={RadioBtn}
            type="radio"
            value="public"
            label="Public"
            checked={group.privacy === "public"}
          />
          <Field
            name="privacy"
            component={RadioBtn}
            type="radio"
            value="private"
            label="Private"
            checked={group.privacy === "private"}
          />
        </div>
        <div className="pg__actions">
          <CancelBtn onCancelClick={() => history.goBack()} />
          <DeleteBtn onDeleteBtnClick={() => deleteGroup(group.id)} />
          <SaveBtn />
        </div>
      </form>
    </div>
  );
};

const mapStateToprops = (state) => {
  const { group } = state.group;
  return {
    initialValues: group,
    group,
    isAdmin: state.group.isAdmin,
  };
};

const wrappedForm = reduxForm({ form: "Group Setting", validate })(
  PageSettings
);

export default connect(mapStateToprops, { getGroup, resetGroups, deleteGroup })(
  wrappedForm
);
