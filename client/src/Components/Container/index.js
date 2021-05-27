import React from "react";
import "./index.style.scss";
const Container = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="hidden__container"> </div>
      {children}
    </div>
  );
};

export default Container;
