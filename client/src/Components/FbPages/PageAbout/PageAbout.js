import React from "react";
import "./pageAbout.style.scss";

const SideBar = ({ title, description, actions, count }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar--title">{title}</h3>
      <p className="sidebar--description">{description}</p>
      <p className="sidebar-info">{count}</p>
      <div className="side--actions">{actions}</div>
    </div>
  );
};

export default SideBar;
