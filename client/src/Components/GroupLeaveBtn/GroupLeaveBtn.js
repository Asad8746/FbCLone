import React from "react";
import Actions from "../../Actions";

const { leaveGroup } = Actions;
const GroupLeaveBtn = ({ id }) => {
  return (
    <button className="ui red button" onClick={() => leaveGroup(id)}>
      Leave
    </button>
  );
};

export default GroupLeaveBtn;
