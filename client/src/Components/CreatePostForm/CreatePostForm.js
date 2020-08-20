import React, { useState } from "react";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import Actions from "../../Actions";
import ImageUploader from "../ImageUploader/ImageUploader.Component";

import "./createForm.style.scss";
const { createPost, setImage } = Actions;

class CreatePostForm extends React.Component {
  renderError = ({ error, submitFailed }) => {
    if (error && submitFailed) {
      return (
        <div className="ui negative message" id="error">
          <i className="close icon"></i>
          <div>{error}</div>
        </div>
      );
    }
  };
  renderTextArea = ({ placeholder, input, meta, ...rest }) => {
    const classname = meta.error && meta.submitFailed ? "error-input" : "";
    return (
      <div>
        <textarea
          id={classname}
          placeholder={placeholder}
          {...input}
          {...rest}
        ></textarea>
        {this.renderError(meta)}
      </div>
    );
  };
  onHandleSubmit = (formValues, ...rest) => {
    this.props.createPost(formValues, this.props.image, this.props.urlToPost);
    this.props.setImage(null);
    this.props.dispatch(reset("Post"));
  };

  render() {
    console.log(this.props.urlToPost);

    console.log(this.props);
    return (
      <div className="create-form">
        <h4>Create Post</h4>
        <form onSubmit={this.props.handleSubmit(this.onHandleSubmit)}>
          <Field
            name="description"
            component={this.renderTextArea}
            placeholder="What is on your mind ?"
          />
          <br />
          <ImageUploader
            LabelForImage={<i className="image icon" id="image-icon"></i>}
          />
          <button id="post-btn">Post</button>
        </form>
      </div>
    );
  }
}

const validate = ({ description }) => {
  let errors = {};
  if (!description) {
    errors.description = "Post is not suppose to be Empty";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { image: state.image };
};

const formWrapped = reduxForm({ form: "Post", validate })(CreatePostForm);
export default connect(mapStateToProps, { createPost, setImage })(formWrapped);
