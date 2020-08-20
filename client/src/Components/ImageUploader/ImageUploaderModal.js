import React, { useEffect } from "react";
import Modal from "../modal/modal.component";
import ImageUploaderComponent from "../ImageUploader/ImageUploader.Component";
import history from "../../history";
import { connect } from "react-redux";
import Actions from "../../Actions";
import ErrorComponent from "../ErrorComponent/errorComponent";
const { uploadPhoto, setError, eraseError } = Actions;

const ImageUploaderModal = ({
  image,
  uploadPhoto,
  location,
  eraseError,
  setError,
}) => {
  const { uploadUrl } = location.state;
  useEffect(() => {
    return () => {
      eraseError();
    };
  });

  // Event Listener for Save Button
  const onSaveClick = (e) => {
    if (!image) {
      setError("Please Upload a Valid Image");
      return e.preventDefault();
    }
    return uploadPhoto(image, uploadUrl);
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
          Save
        </div>
      </>
    );
  };
  return (
    <div>
      <Modal
        header="Upload a new Photo"
        onDismiss={() => {
          history.goBack();
        }}
        actions={renderActions()}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { image: state.image, progress: state.uploadProgress };
};

export default connect(mapStateToProps, { uploadPhoto, setError, eraseError })(
  ImageUploaderModal
);
