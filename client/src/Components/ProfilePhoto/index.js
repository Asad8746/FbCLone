import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { url } from "../../Api";
import history from "../../history";

import "./index.style.scss";

const ProfilePhoto = ({ id, isUser }) => {
  return (
    <div className="profile-pic">
      <img
        className="profile-pic__image"
        src={`${url}/profile/profile_pic/${id}?${Date.now()}`}
        alt="cool img"
      />
      {isUser && (
        <button
          className="profile-pic__upload-btn"
          style={{ cursor: "pointer" }}
          onClick={() =>
            history.push("/upload", { uploadUrl: "/profile/upload/dp" })
          }
        >
          <div className="profile-pic__icon-container">
            <i className="camera icon" id="icon"></i>
            <p className="profile-pic__label">Upload</p>
          </div>
        </button>
      )}
    </div>
  );
};
ProfilePhoto.propTypes = {
  id: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    id: state.profileReducer.profile._id,
    isUser: state.isUser,
  };
};
export default connect(mapStateToProps)(ProfilePhoto);
