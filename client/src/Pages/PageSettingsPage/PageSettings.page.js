import React, { useEffect } from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DeleteBtn from "../../Components/DeleteBtn/DeleteBtn.component";
import "./pageSettings.style.scss";
import { Redirect } from "react-router-dom";
import CancelBtn from "../../Components/CancelBtn/CancelBtn.component";
import FormField from "../../Components/FormField/FormField.component";

const { getPage, deletePage, updatePage } = Actions;

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
    <div className="page-form-container">
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
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
