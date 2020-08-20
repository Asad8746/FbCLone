import React from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
const { setImage } = Actions;
const ImageUploaderComponent = ({ setImage, LabelForImage }) => {
  const onChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <>
      <label htmlFor="upload-input">{LabelForImage}</label>
      <input
        type="file"
        id="upload-input"
        onChange={onChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default connect(null, { setImage })(ImageUploaderComponent);
