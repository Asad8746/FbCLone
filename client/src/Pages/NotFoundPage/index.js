import React from "react";
import "./index.style.scss";
import history from "../../history";

const NotFound = () => {
  const onBackBtnClick = () => {
    history.push("/");
  };
  return (
    <div className="nf-container">
      <h3 className="nf--heading">404 Not Found</h3>
      <button className="ui button" id="nf-btn" onClick={onBackBtnClick}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
