import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser, eraseError } from "../../Actions";
import ErrorComponent from "../ErrorComponent";
import FormField from "../FormField";
import RadioBtn from "../FormField/RadioButton";

import "./index.style.scss";

class RegisterUser extends React.Component {
  state = { loading: false };
  componentWillUnmount() {
    this.props.eraseError();
  }
  onSubmit = (formValues) => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    this.props.registerUser(formValues, () => {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
    });
  };
  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="f_name"
            component={FormField}
            type="text"
            placeholder="First Name"
            label="First Name"
            required={true}
          />
          <Field
            name="l_name"
            component={FormField}
            type="text"
            placeholder="Last Name"
            label="Last Name"
            required={true}
          />
          <Field
            name="email"
            component={FormField}
            type="email"
            placeholder="Email"
            label="Email"
            required={true}
          />
          <Field
            name="password"
            component={FormField}
            type="password"
            placeholder="Password"
            label="Password"
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

          <div className="form-field">
            <label className="radio__label">Gender</label>
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
          <div className="u-center-text u-margin-top-medium">
            <button type="submit" className="btn signup__btn">
              {this.state.loading ? (
                <div className="ui inline inverted active loader"></div>
              ) : (
                <p>Sign up &rarr;</p>
              )}
            </button>
            <Link className="page-link" to="/">
              Login to Facebook Clone
            </Link>
          </div>
        </form>
      </>
    );
  }
}

const validate = ({ f_name, l_name, email, password, about, gender }) => {
  let errors = {};
  if (!f_name) {
    errors.f_name = "First Name is required";
  }
  if (!l_name) {
    errors.l_name = "Last Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }

  if (!about) {
    errors.about = "Please Tell us what you do?";
  }
  if (!gender) {
    errors.gender = "Please Specify your gender";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    loading: state.Authentication.isLoading,
  };
};

const formWrapped = reduxForm({ form: "registeruser", validate })(RegisterUser);
export default connect(mapStateToProps, { registerUser, eraseError })(
  formWrapped
);
