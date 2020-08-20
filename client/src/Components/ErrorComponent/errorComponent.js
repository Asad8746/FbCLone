import React, { useEffect } from "react";
import { connect } from "react-redux";
import Actions from "../../Actions";
const { eraseError } = Actions;

const ErrorComponent = ({ error, eraseError }) => {
  return !error ? null : (
    <div className="ui negative message" id="message">
      <i
        className="close icon"
        onClick={() => {
          eraseError();
        }}
      ></i>
      <p>{error}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error };
};

export default connect(mapStateToProps, { eraseError })(ErrorComponent);
