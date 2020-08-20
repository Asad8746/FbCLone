import React from "react";
import history from "../../history";
const ExpiredLink = () => {
  return (
    <div className="ui container">
      <div className="ui segment">
        The Link you are trying to access is expired
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ExpiredLink;
