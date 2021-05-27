import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { setImage, createGroup, setReducer } from "../../Actions";
import FormField from "../../Components/FormField";
import ImageUploadField from "../../Components/ImageUploadField";
import RadioBtn from "../../Components/FormField/RadioButton";

import "./index.style.scss";

const CreatePageForm = ({
  setImage,
  image,
  createGroup,
  handleSubmit,
  ...rest
}) => {
  const onSubmit = (formValues) => {
    createGroup(formValues);
  };
  useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);
  return (
    <div className="create-group__container">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="form-field">
          <label className="radio__label">Privacy</label>
          <Field
            name="privacy"
            component={RadioBtn}
            type="radio"
            value="public"
            label="Public"
          />
          <Field
            name="privacy"
            component={RadioBtn}
            type="radio"
            value="private"
            label="Private"
          />
        </div>
        <ImageUploadField label="Group Cover" />
        <div className="u-center-text u-margin-top-medium">
          <button className="create-group__button" type="submit">
            Create
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

export default connect(mapStateToProps, { setImage, createGroup, setReducer })(
  wrappedComponent
);
