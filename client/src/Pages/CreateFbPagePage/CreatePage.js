import React from "react";
import "./form.style.scss";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Actions from "../../Actions";
import FormField from "../../Components/FormField/FormField.component";
const { setImage, createPage } = Actions;

const CreatePageForm = ({
  setImage,
  image,
  createPage,
  handleSubmit,
  ...rest
}) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
    console.log(image);
    createPage(formValues);
  };
  return (
    <div className="page-form-container">
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          component={FormField}
          label="Page Name"
          placeholder="Page Name"
          required={true}
        />
        <Field
          name="description"
          component={FormField}
          label="Page Description"
          placeholder="Page Description"
          required={true}
        />
        <div className="ui required field">
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
  if (!formValues.name) {
    errors.name = "Page Name is required";
  }
  if (!formValues.description) {
    errors.description = "Description is required";
  }
  return errors;
};

const wrappedComponent = reduxForm({ form: "Page", validate: validation })(
  CreatePageForm
);

export default connect(mapStateToProps, { setImage, createPage })(
  wrappedComponent
);
