import React, { Component } from "react";
import "./index.style.scss";
import { ReactComponent as ServerDownSvg } from "../../Images/server-down.svg";
class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <ServerDownSvg className="error-svg" />
          <p>Oops! Server is Down</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
