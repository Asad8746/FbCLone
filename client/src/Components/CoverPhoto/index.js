import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "../../history";
import "./index.style.scss";

const CoverPhoto = ({
  isAuthUser,
  renderActions,
  alt,
  urlToImage,
  uploadUrl,
}) => {
  return (
    <div className="cover">
      <div className="cover__overlay"></div>
      <img className="cover__image" src={urlToImage} alt={`${alt} Cover Pic`} />
      {isAuthUser && (
        <span
          className="cover__upload"
          onClick={() => {
            history.push("/upload", { uploadUrl });
          }}
        >
          <i className="camera icon action-icon"></i>
        </span>
      )}
      {!isAuthUser && <div className="cover__actions">{renderActions()}</div>}
    </div>
  );
};
CoverPhoto.defaultProps = {
  renderActions: () => null,
};

CoverPhoto.propTypes = {
  isAuthUser: PropTypes.bool.isRequired,
  renderActions: PropTypes.func,
  alt: PropTypes.string,
  urlToImage: PropTypes.string.isRequired,
  uploadUrl: PropTypes.string.isRequired,
};

export default connect()(CoverPhoto);
