import React, { useEffect, useState } from "react";
import Modal from "../modal/modal.component";
import ImageUploaderComponent from "../ImageUploader";
import history from "../../history";
import { connect } from "react-redux";
import { uploadPhoto, setError, eraseError, setImage } from "../../Actions";
import ErrorComponent from "../ErrorComponent";
import "./index.style.scss";

const ImageUploaderModal = ({
  image,
  uploadPhoto,
  location,
  eraseError,
  setError,
  setImage,
}) => {
  const [loading, setLoading] = useState(false);
  const { uploadUrl } = location.state;
  useEffect(() => {
    return () => {
      if (image) {
        setImage(null);
      }
      eraseError();
    };
  });

  // Event Listener for Save Button
  const onSaveClick = (e) => {
    if (!image) {
      setError("Please Upload a Valid Image");
      return e.preventDefault();
    }
    if (!loading) {
      setLoading(true);
    }
    return uploadPhoto(image, uploadUrl, () => {
      if (loading) {
        setLoading(false);
      }
    });
  };

  const renderLabel = () => {
    return (
      <>
        <div className="ui button">Upload</div>
      </>
    );
  };
  const renderActions = () => {
    return (
      <>
        <ErrorComponent />
        <ImageUploaderComponent LabelForImage={renderLabel()} />
        <div className="ui blue button" onClick={onSaveClick}>
          {loading ? (
            <div className="ui inline small inverted active loader"></div>
          ) : (
            <p>Save</p>
          )}
        </div>
      </>
    );
  };
  const renderBody = () => {
    return (
      image && (
        <div className="upload-placeholder__container">
          <img
            src={URL.createObjectURL(image)}
            className="upload-placeholder__img"
            alt="Placeholder"
          />
        </div>
      )
    );
  };
  return (
    <div>
      <Modal
        header="Upload a new Photo"
        onDismiss={() => {
          history.goBack();
        }}
        body={renderBody()}
        actions={renderActions()}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { image: state.image, progress: state.uploadProgress };
};

export default connect(mapStateToProps, {
  uploadPhoto,
  setError,
  eraseError,
  setImage,
})(ImageUploaderModal);
