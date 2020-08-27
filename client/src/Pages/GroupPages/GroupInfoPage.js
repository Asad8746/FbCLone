import React from "react";

const GroupInfoPage = ({ admin }) => {
  return (
    <div className="ui segment">
      <h3 className="ui header">Private Group</h3>
      <h4>
        Group managed By {admin.f_name} {admin.l_name}
      </h4>
    </div>
  );
};

export default GroupInfoPage;
