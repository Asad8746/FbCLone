import React from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";

const { blockUser } = Actions;
// Block Button Component
const BlockButton = ({ toBeBlockedId, blockUser }) => {
  return (
    <button
      className="ui red button"
      onClick={() => {
        blockUser(toBeBlockedId);
      }}
    >
      Block
    </button>
  );
};

const mapStateToProps = (state) => {
  return { toBeBlockedId: state.profileReducer.profile._id };
};
export default connect(mapStateToProps, { blockUser })(BlockButton);
