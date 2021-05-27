import React from "react";
import PropTypes from "prop-types";

const GroupInfoPage = ({ adminName }) => {
  return (
    <div className="ui segment">
      <h3 className="ui header">Private Group</h3>
      <h4>Group managed By {adminName}</h4>
    </div>
  );
};
GroupInfoPage.propTypes = {
  adminName: PropTypes.string.isRequired,
};

export default GroupInfoPage;
