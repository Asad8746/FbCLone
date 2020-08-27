import React, { useEffect, useState } from "react";
import Modal from "../../modal/modal.component";
import { connect } from "react-redux";
import history from "../../../history";
import Actions from "../../../Actions";
import "./editPost.style.scss";
const { getPost, updatePost } = Actions;
const renderActions = (onFormSubmit) => {
  return (
    <>
      <button className="ui grey button" onClick={onDissmiss}>
        Cancel
      </button>
      <button className="ui blue button" onClick={onFormSubmit}>
        Save
      </button>
    </>
  );
};
const onDissmiss = () => {
  history.goBack();
};

// EditPostModal
const EditPostComponent = ({ match, getPost, post, updatePost, ...rest }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const { id } = match.params;

  /*
  React LifeCycle Hooks
  */
  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(post).length !== 0) {
      setDescription(post.description);
    }
  }, [post]);
  const onChange = (event) => {
    setDescription(event.target.value);
  };

  /*
  React LifeCycle Hooks Ended here
  */

  /*
  RenderFields is responsible for Rendering form  on my Modal
  RenderActions is responsible for Rendering Actions on my Modal
  */
  const renderFields = () => {
    if (Object.keys(post).length === 0)
      return <div className="ui active loader"></div>;
    return (
      <form onSubmit={onFormSubmit}>
        <label id="edit-label">
          Enter Your Post Description
          <textarea
            type="text"
            id="edit-text-area"
            value={description}
            onChange={onChange}
          ></textarea>
        </label>
        {!error ? null : <div className="ui negative message">{error}</div>}
      </form>
    );
  };
  /*
  Render Functions Ended Here
  */

  /*
    Form Submission Function
  */
  const onFormSubmit = () => {
    if (post.description === description) return history.goBack();
    if (!description || description.length === 0) {
      setError("Description is not suppose to be Empty");
      return setTimeout(() => {
        setError("");
      }, 10000);
    }
    if (post.belongsTo === "page") {
      return updatePost(
        description,
        `http://localhost:5000/pages/${post.pageId}/post/${post._id}`
      );
    }
    return updatePost(
      description,
      `http://localhost:5000/posts/post/${post._id}`
    );
  };

  /*
Form Submission Function Ended here
*/

  return (
    <Modal
      header="Edit Post"
      body={renderFields(post)}
      actions={renderActions(onFormSubmit)}
      onDismiss={onDissmiss}
    />
  );
};

const mapStateToProps = (state) => {
  return { post: state.post };
};

export default connect(mapStateToProps, { getPost, updatePost })(
  EditPostComponent
);
