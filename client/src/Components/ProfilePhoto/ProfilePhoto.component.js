import React from "react";
import { connect } from "react-redux";
import "./profilephoto.style.scss";
import history from "../../history";

const ProfilePhoto = ({ id, isUser }) => {
  if (!isUser) {
    return (
      <>
        <div className="people-profile-pic">
          <img
            key={Date.now()}
            src={`http://localhost:5000/profile/profile_pic/${id}?${Date.now()}`}
            alt="cool img"
          />
        </div>
      </>
    );
  }
  return (
    <div className="profile-pic">
      <img
        src={`http://localhost:5000/profile/profile_pic/${id}?${Date.now()}`}
        alt="cool img"
      />
      <button
        style={{ cursor: "pointer" }}
        onClick={() =>
          history.push("/upload", { uploadUrl: "/profile/upload/dp" })
        }
      >
        <i className="camera icon" id="icon"></i>
        <br />
        Upload
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.profileReducer.profile._id,
    isUser: state.isUser,
    imageUpdated: state.imageUpdated,
  };
};
export default connect(mapStateToProps)(ProfilePhoto);
