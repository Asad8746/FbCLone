import React, { useEffect } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DeleteBtn from "../../Components/DeleteBtn/DeleteBtn.component";
import { Redirect } from "react-router-dom";
import CancelBtn from "../../Components/CancelBtn/CancelBtn.component";
import FormField from "../../Components/FormField/FormField.component";
import Loader from "../../Components/Loader";
import DropDown from "../../Components/FormField/DropDown.component";

const { getGroup, updateGroup, deleteGroup } = Actions;

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

// Main Component
const PageSettings = ({
  group,
  auth_id,
  match,
  history,
  handleSubmit,
  getGroup,

  deleteGroup,
}) => {
  const { id } = match.params;
  useEffect(() => {
    getGroup(id);
  }, []);
  const onSubmit = ({ name, description, group_privacy }) => {
    if (
      name === group.name &&
      description === group.description &&
      group_privacy === group.group_privacy
    ) {
      return history.push(`/groups/${group._id}`);
    }
    console.log(name, description, group_privacy);
    updateGroup(group._id, { name, description, group_privacy });
  };
  if (!group) {
    return <Loader />;
  }
  if (group.group_admin_id._id !== auth_id) return <Redirect to="/expired" />;
  return (
    <div className="page-form-container">
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
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
        <Field
          component={DropDown}
          label="Group Privacy"
          type="text"
          name="group_privacy"
          placeholder="Enter New Group Description"
        />
        <div className="page-settings-actions-container">
          <CancelBtn onCancelClick={() => history.goBack()} />
          <DeleteBtn onDeleteBtnClick={() => deleteGroup(group._id)} />
          <button className="pageBtn save-btn animateBtn" type="submit">
            <i className="save icon btnIcon" id="save-icon"></i>
          </button>
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
    auth_id: state.Authentication.id,
  };
};

const wrappedForm = reduxForm({ form: "Group Setting", validate })(
  PageSettings
);

export default connect(mapStateToprops, { getGroup, deleteGroup })(wrappedForm);
