import React from "react";
import { Link } from "react-router-dom";
const DropDownItem = ({ label, link, divide }) => {
  return (
    <>
      <Link to={link} className="item">
        {label}
      </Link>
      {divide ? <div className="divider"></div> : null}
    </>
  );
};

export default DropDownItem;
