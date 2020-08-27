import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import "./coverphoto.style.scss";

const CoverPhoto = ({ isAuthUser, alt, urlToImage, uploadUrl }) => {
  return (
    <>
      <img className="cover-image" src={urlToImage} alt={`${alt} Cover Pic`} />
      {isAuthUser ? (
        <span
          className="action-box"
          onClick={() => {
            history.push("/upload", { uploadUrl });
          }}
        >
          <i className="camera icon" id="action-icon"></i>
        </span>
      ) : null}
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isUser: state.isUser,
//     id: state.Profile._id,
//     // name: `${state.Profile.f_name} ${state.Profile.l_name}`,
//   };
// };
export default connect()(CoverPhoto);
