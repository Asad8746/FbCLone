import React from "react";
import "./index.style.scss";
const DropDownMenu = ({ children }) => {
  return (
    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default DropDownMenu;
