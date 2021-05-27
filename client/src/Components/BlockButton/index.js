import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { blockUser } from "../../Actions";
import "./index.styles.scss";
const BlockButton = ({ toBeBlockedId, blockUser }) => {
  return (
    <button
      className="block-btn"
      onClick={() => {
        blockUser(toBeBlockedId);
      }}
    >
      Block
    </button>
  );
};
BlockButton.defaultProps = {
  toBeBlockedId: "",
  blockUser: () => {},
};

BlockButton.propTypes = {
  toBeBlockedId: PropTypes.string.isRequired,
  blockUser: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { toBeBlockedId: state.profileReducer.profile._id };
};
export default connect(mapStateToProps, { blockUser })(BlockButton);
