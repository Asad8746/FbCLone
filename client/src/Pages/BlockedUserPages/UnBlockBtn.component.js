import React from "react";
import Actions from "../../Actions";
import { connect } from "react-redux";
const { unBlockUser } = Actions;

const UnBlockBtn = ({ id, unBlockUser }) => {
  return (
    <button onClick={() => unBlockUser(id)} className="ui blue button">
      UNBLOCK
    </button>
  );
};

export default connect(null, { unBlockUser })(UnBlockBtn);
