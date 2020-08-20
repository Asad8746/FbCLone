import React, { useEffect } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DeleteBtn from "../../Components/DeleteBtn/DeleteBtn.component";
import "./pageSettings.style.scss";
import { Redirect } from "react-router-dom";
import CancelBtn from "../../Components/CancelBtn/CancelBtn.component";

const { getPage, deletePage, updatePage } = Actions;

// Helper Functions

// A Helper function which will render
// error message if the field is touched and
// error is defined
const renderError = (meta) => {
  if (meta.touched && meta.error) {
    return <div className="ui negative message">{meta.error}</div>;
  }
};

// A Helper Function which will render Field Component
// with props passed from  reduxFrom.
const renderField = ({ label, type, placeholder, input, meta }) => {
  return (
    <div className="field">
      <label>
        {label}
        <input type={type} placeholder={placeholder} {...input} />
      </label>
      {renderError(meta)}
    </div>
  );
};

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
  }, []);
  const onSubmit = ({ page_name, page_description }) => {
    if (
      page_name === page.page_name &&
      page_description === page.page_description
    ) {
      return history.push(`/pages/${page._id}`);
    }
    updatePage(page._id, { page_name, page_description });
  };
  if (!page) {
    return <div className="ui active loader"></div>;
  }
  if (page.page_admin_id !== auth_id) return <Redirect to="/expired" />;
  return (
    <div className="page-form-container">
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={renderField}
          label="Page Name"
          type="text"
          name="page_name"
          placeholder="Enter Page Name"
        />
        <Field
          component={renderField}
          label="Page Description"
          type="text"
          name="page_description"
          placeholder="Enter Page Description"
        />
        <div className="page-settings-actions-container">
          <CancelBtn onCancelClick={() => history.goBack()} />
          <DeleteBtn onDeleteBtnClick={() => deletePage(page._id)} />
          <button className="pageBtn save-btn animateBtn" type="submit">
            <i className="save icon btnIcon" id="save-icon"></i>
          </button>
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
