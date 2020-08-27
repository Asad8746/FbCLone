import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Actions from "../../Actions";
import FormField from "../../Components/FormField/FormField.component";
const { setImage, createGroup } = Actions;

const renderError = (meta) => {
  const { touched, error } = meta;
  if (touched && error) {
    return <div className="ui negative message">{error}</div>;
  }
};

const dropDown = ({ input, meta, label }) => {
  return (
    <div className="required field">
      <label>{label}</label>
      <select className="ui selection dropdown" {...input}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      {renderError(meta)}
    </div>
  );
};

const CreatePageForm = ({
  setImage,
  image,
  createGroup,
  handleSubmit,
  ...rest
}) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
    createGroup(formValues);
  };
  return (
    <div className="page-form-container">
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          component={FormField}
          label="Group Name"
          required={true}
          placeholder="Group Name"
        />
        <Field
          name="description"
          component={FormField}
          label="Group Description"
          placeholder="Group Description"
          required={true}
        />
        <Field
          name="privacy"
          component={dropDown}
          label="Group Privacy"
          placeholder="Group Privacy"
        />
        <div className="ui field">
          <label htmlFor="PageCoverImage">Page Cover Image</label>
          <input
            type="file"
            id="PageCoverImage"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="button-container">
          <button className="ui button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { image: state.image, initialValues: { privacy: "public" } };
};
const validation = (formValues) => {
  let errors = {};
  if (!formValues.name) {
    errors.name = "Group Name is required";
  }
  if (!formValues.description) {
    errors.description = "Group is required";
  }
  return errors;
};

const wrappedComponent = reduxForm({ form: "Group", validate: validation })(
  CreatePageForm
);

export default connect(mapStateToProps, { setImage, createGroup })(
  wrappedComponent
);
