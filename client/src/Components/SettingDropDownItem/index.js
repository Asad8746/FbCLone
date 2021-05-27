import React from "react";
import { Link } from "react-router-dom";
import "./index.style.scss";
const DropDownItem = ({ label, link }) => {
  return (
    <Link className="setting-dropdown__item" to={link}>
      {label}
    </Link>
  );
};

export default DropDownItem;
