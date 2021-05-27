import React from "react";
import { connect } from "react-redux";
import { eraseError } from "../../Actions";
import "./index.style.scss";
const ErrorComponent = ({ error, eraseError }) => {
  return !error ? null : (
    <div className="error__message">
      <p>{error}</p>
      <i
        className="close rounded icon"
        id="error__message-icon"
        onClick={() => {
          eraseError();
        }}
      ></i>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error };
};

export default connect(mapStateToProps, { eraseError })(ErrorComponent);
