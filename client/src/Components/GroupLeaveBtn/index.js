import React from "react";
import { leaveGroup } from "../../Actions";

const GroupLeaveBtn = ({ id }) => {
  return (
    <button
      style={{ marginTop: 10 }}
      className="ui red button"
      onClick={() => leaveGroup(id)}
    >
      Leave
    </button>
  );
};

export default GroupLeaveBtn;
