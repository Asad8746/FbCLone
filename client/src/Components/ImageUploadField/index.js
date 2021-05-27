import React from "react";
import { setImage } from "../../Actions";
import { connect } from "react-redux";
import "./index.style.scss";
const ImageUploadField = ({ label, setImage }) => {
  return (
    <div className="image-field">
      <label className="image-field__label" htmlFor="image__input">
        {label}
      </label>
      <input
        accept="image/*"
        type="file"
        id="image__input"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default connect(null, { setImage })(ImageUploadField);
