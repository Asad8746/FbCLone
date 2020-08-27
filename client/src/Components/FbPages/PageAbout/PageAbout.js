import React from "react";
import "./pageAbout.style.scss";

const SideBar = ({ title, description, actions, information }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar--title">{title}</h3>
      <p className="sidebar--description">{description}</p>
      <div className="sidebar-info">{information}</div>
      <div className="side--actions">{actions}</div>
    </div>
  );
};

export default SideBar;
