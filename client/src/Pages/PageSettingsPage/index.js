import React, { useEffect } from "react";
import { getPage, deletePage, updatePage } from "../../Actions";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DeleteBtn from "../../Components/DeleteBtn";
import "./index.style.scss";
import { Redirect } from "react-router-dom";
import CancelBtn from "../../Components/CancelBtn";
import SaveBtn from "../../Components/SaveButton";

import FormField from "../../Components/FormField";

/* A function for validation which 
  will check that page_name and page_description 
  is required.
*/
const validate = (formValues) => {
  let errors = {};
  if (!formValues.page_name) {
    errors.page_name = "Page Name is required";
  }
  if (!formValues.page_description) {
    errors.page_description = "Page Description is required";
  }
  return errors;
};

// Main Component
const PageSettings = ({
  getPage,
  match,
  history,
  page,
  auth_id,
  handleSubmit,
  deletePage,
}) => {
  const { id } = match.params;
  useEffect(() => {
    getPage(id);
  }, [id, getPage]);
  const onSubmit = ({ name, description }) => {
    if (name === page.name && description === page.description) {
      return history.push(`/pages/${page._id}`);
    }
    updatePage(page._id, { name, description });
  };
  if (!page) {
    return <div className="ui active loader"></div>;
  }
  if (page.page_admin_id !== auth_id) return <Redirect to="/expired" />;
  return (
    <div className="pg__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={FormField}
          label="Page Name"
          type="text"
          name="name"
          placeholder="Enter Page Name"
          required={true}
        />
        <Field
          component={FormField}
          label="Page Description"
          type="text"
          name="description"
          placeholder="Enter Page Description"
          required={true}
        />
        <div className="pg__actions">
          <CancelBtn />
          <DeleteBtn onDeleteBtnClick={() => deletePage(page._id)} />
          <SaveBtn />
        </div>
      </form>
    </div>
  );
};

const mapStateToprops = (state) => {
  const { page } = state.pages;
  return { initialValues: page, page, auth_id: state.Authentication.id };
};

const wrappedForm = reduxForm({ form: "Page Setting", validate })(PageSettings);

export default connect(mapStateToprops, { getPage, deletePage })(wrappedForm);
