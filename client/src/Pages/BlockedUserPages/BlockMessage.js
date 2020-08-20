import React from "react";
import { Link } from "react-router-dom";

const BlockMessage = ({ message, renderLink }) => {
  return (
    <div className="ui container">
      <div className="ui center aligned segment">
        <p style={{ textTransform: "uppercase" }}>{message}</p>
        {renderLink ? (
          <Link to="/blocked/users">Link to your Blocked Users</Link>
        ) : null}
      </div>
    </div>
  );
};

export default BlockMessage;
