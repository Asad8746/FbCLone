import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { LoginUser, eraseError } from "../../Actions";

import ErrorComponent from "../ErrorComponent";
import FormField from "../FormField";

import "./login.Style.scss";

class LoginComponent extends React.Component {
  state = {
    loading: false,
  };
  componentWillUnmount() {
    this.props.eraseError();
  }

  onSubmit = (formValues) => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    this.props.LoginUser(formValues, () => {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
    });
  };
  render() {
    return (
      <div className="login">
        <h2 className="logo">FaceBook Clone</h2>
        <div className="login__container">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              component={FormField}
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              required={true}
            />
            <Field
              component={FormField}
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              required={true}
            />
            <ErrorComponent />
            <div className="u-center-text u-margin-top-medium">
              <button className="btn login__btn">
                {this.state.loading ? (
                  <div className="ui inline inverted active loader"></div>
                ) : (
                  <p>Login &rarr;</p>
                )}
              </button>
              <Link className="page-link" to="/register">
                New here? Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const validate = ({ email, password }) => {
  let errors = {};
  if (!email) {
    errors.email = "Please Enter Your Email";
  }
  if (!password) {
    errors.password = "Please Enter Your Password";
  }
  return errors;
};

const wrappedForm = reduxForm({ form: "LoginForm", validate })(LoginComponent);
export default connect(null, { LoginUser, eraseError })(wrappedForm);
