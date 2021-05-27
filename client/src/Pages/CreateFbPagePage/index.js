import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { setImage, createPage } from "../../Actions";

import FormField from "../../Components/FormField";
import ImageUploadField from "../../Components/ImageUploadField";
import "./index.style.scss";

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
  useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);
  return (
    <div className="page__container">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="u-margin-bottom-medium">
          <ImageUploadField label="Page Cover" />
        </div>
        <div className="u-center-text">
          <button className="page__btn" type="submit">
            Create
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
