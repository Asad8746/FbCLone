import React from "react";
import { unBlockUser } from "../../Actions";
import { connect } from "react-redux";

const UnBlockBtn = ({ id, unBlockUser }) => {
  return (
    <button onClick={() => unBlockUser(id)} className="ui blue button">
      UNBLOCK
    </button>
  );
};

export default connect(null, { unBlockUser })(UnBlockBtn);
