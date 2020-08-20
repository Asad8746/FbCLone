import React from "react";
import "./form.style.scss";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Actions from "../../Actions";
const { setImage, createPage } = Actions;

const renderError = (meta) => {
  const { touched, error } = meta;
  if (touched && error) {
    return <div className="ui negative message">{error}</div>;
  }
};

const renderField = ({ input, placeholder, label, meta }) => {
  return (
    <div class="field">
      <label>{label}</label>
      <input type="text" placeholder={placeholder} {...input} />
      {renderError(meta)}
    </div>
  );
};

const CreatePageForm = ({
  setImage,
  image,
  createPage,
  handleSubmit,
  ...rest
}) => {
  const onSubmit = (formValues) => {
    createPage(formValues);
  };
  return (
    <div className="page-form-container">
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="page_name"
          component={renderField}
          label="Page Name"
          placeholder="Page Name"
        />
        <Field
          name="page_description"
          component={renderField}
          label="Page Description"
          placeholder="Page Description"
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
  return { image: state.image };
};
const validation = (formValues) => {
  let errors = {};
  if (!formValues.page_name) {
    errors.page_name = "Name is required";
  }
  if (!formValues.page_description) {
    errors.page_description = "Description is required";
  }
  return errors;
};

const wrappedComponent = reduxForm({ form: "Page", validate: validation })(
  CreatePageForm
);

export default connect(mapStateToProps, { setImage, createPage })(
  wrappedComponent
);
