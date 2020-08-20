import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./secondaryNav.style.scss";
const SecondaryNav = ({ itemList }) => {
  const renderItem = () => {
    return itemList.map((item) => {
      return (
        <div className="item" id={item.styleId} onClick={item.onItemClick}>
          {item.title}
        </div>
      );
    });
  };
  return (
    <div className="navBar">
      {renderItem()}
      <div className="right-menu">
        <Link className="item" to="/pages/new">
          Create New Page
        </Link>
      </div>
    </div>
  );
};

export default SecondaryNav;
