import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Actions from "../../Actions";
import ErrorComponent from "../ErrorComponent/errorComponent";
import FormField from "../FormField/FormField.component";
import "./login.Style.scss";

const { LoginUser, eraseError } = Actions;

class LoginComponent extends React.Component {
  componentWillUnmount() {
    this.props.eraseError();
  }

  onSubmit = (formValues) => {
    try {
      if (this.props.location.state.from) {
        const { pathname } = this.props.location.state.from;
        this.props.LoginUser(formValues, pathname);
      }
    } catch (ex) {
      this.props.LoginUser(formValues);
    }
  };
  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <form
            className="ui form error"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field
              component={FormField}
              type="email"
              name="email"
              placeholder="Enter Your Email"
              label="Your Email"
              required={true}
            />
            <Field
              component={FormField}
              type="password"
              name="password"
              placeholder="Enter Your Password"
              label="Your Password"
              required={true}
            />
            <ErrorComponent />
            <div className="login-btn-box">
              <button className="ui primary button login-btn">Login</button>
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
