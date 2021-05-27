import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createPost, setImage } from "../../Actions";
import { url } from "../../Api";
import ImageUploader from "../ImageUploader/";
import TextArea from "../TextArea";
import "./index.style.scss";
import { ReactComponent as RemoveIcon } from "../../Images/remove.svg";

const CreatePostForm = ({
  profileId,
  f_name,
  l_name,
  image,
  urlToPost,
  createPost,
  setImage,
}) => {
  useEffect(() => {
    return () => setImage(null);
  }, []);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const renderAction = () => {
    return (
      <div className="create-form__imageUploader">
        <i className="images outline icon" id="image-icon"></i>
        <p>Photo</p>
      </div>
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) {
      return setError("Post Description is required");
    }
    if (!loading) {
      setLoading(true);
    }
    createPost({ value }, image, urlToPost, (error) => {
      setLoading(false);
      if (error) {
        setError(error);
      }

      if (image) {
        setImage(null);
      }
      if (value.length > 0) {
        setValue("");
      }
    });
  };

  return (
    <div className="create-form">
      <div className="avatar">
        <img
          className="avatar__img"
          src={`${url}/profile/profile_pic/${profileId}?${Date.now()}`}
          alt="avatar"
        />
        <h3 className="create-form__name">{`${f_name} ${l_name}`}</h3>
      </div>
      <form onSubmit={onSubmit}>
        <TextArea
          value={value}
          setValue={setValue}
          id="post-description"
          error={error}
          placeholder="What's on your Mind"
        />
        {error && (
          <div className="post__error">
            {error}
            <i className="close rounded icon" onClick={() => setError("")}></i>
          </div>
        )}
        <div className="create-form__actionscontainer">
          {image ? (
            <div className="placeholder">
              <img
                className="placeholder__img"
                src={URL.createObjectURL(image)}
                alt="Post Placeholder"
              />
              <div
                className="placeholder__overlay"
                onClick={() => setImage(null)}
              >
                <RemoveIcon className="placeholder__icon" />
              </div>
            </div>
          ) : null}
          <ImageUploader LabelForImage={renderAction()} />
          <button className="create-form__button">
            {loading ? (
              <div className="ui inline inverted active loader"></div>
            ) : (
              <p>Post</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
CreatePostForm.propTypes = {
  profileId: PropTypes.string.isRequired,
  f_name: PropTypes.string.isRequired,
  l_name: PropTypes.string.isRequired,
  image: PropTypes.any,
  urlToPost: PropTypes.string.isRequired,
  createPost: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    image: state.image,
    profileId: state.Authentication.id,
    f_name: state.Authentication.f_name,
    l_name: state.Authentication.l_name,
  };
};

export default connect(mapStateToProps, { createPost, setImage })(
  CreatePostForm
);
