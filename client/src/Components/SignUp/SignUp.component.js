import React from "react";
import { Field, reduxForm } from "redux-form";
import Actions from "../../Actions";
import { connect } from "react-redux";
import ErrorComponent from "../ErrorComponent/errorComponent";
import FormField from "../FormField/FormField.component";

import RadioBtn from "../../Components/RadioBtn/RadioBtn.component";
import "./signUp.style.scss";
const { registerUser, eraseError } = Actions;

class RegisterUser extends React.Component {
  componentWillUnmount() {
    this.props.eraseError();
  }

  renderRadioBtn = ({ type, input, label, ...rest }) => {
    return (
      <div className="field">
        <label id="radio-label">
          {" "}
          <input type={type} {...input} {...rest} /> {label}
        </label>
      </div>
    );
  };
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.registerUser(formValues);
  };
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="f_name"
            component={FormField}
            type="text"
            placeholder="Enter Your First Name"
            label="Enter Your First Name"
            required={true}
          />
          <Field
            name="l_name"
            component={FormField}
            type="text"
            placeholder="Enter Your Last Name"
            label="Enter Your Last Name"
            required={true}
          />
          <Field
            name="email"
            component={FormField}
            type="email"
            placeholder="Enter Your Email"
            label="Enter Your Email"
            required={true}
          />
          <Field
            name="password"
            component={FormField}
            type="password"
            placeholder="Enter Your Password"
            label="Enter Your Password"
            required={true}
          />
          <Field
            name="about"
            component={FormField}
            type="text"
            placeholder="What you do"
            label="What you do"
            required={true}
          />

          <div className=" required field">
            <label>Gender</label>
            <Field
              name="gender"
              component={RadioBtn}
              type="radio"
              value="male"
              label="Male"
            />
            <Field
              name="gender"
              component={RadioBtn}
              type="radio"
              value="female"
              label="Female"
            />
          </div>
          <ErrorComponent />
          <div className="btn-box">
            <button className="ui button " id="sign-up-btn">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({ f_name, l_name, email, password, gender }) => {
  let errors = {};
  if (!f_name) {
    errors.f_name = "First Name is not suppose to be Empty";
  }
  if (!l_name) {
    errors.l_name = "Last Name is not suppose to be Empty";
  }
  if (!email) {
    errors.email = "Email is not suppose to be Empty";
  }
  if (!password) {
    errors.password = "Password is not suppose to be Empty";
  }
  if (!gender) {
    errors.gender = "Please Specify your gender";
  }
  return errors;
};

const formWrapped = reduxForm({ form: "registeruser", validate })(RegisterUser);
export default connect(null, { registerUser, eraseError })(formWrapped);
