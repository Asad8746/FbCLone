import React from "react";
import "./secondaryNav.style.scss";
const SecondaryNav = ({ itemList, rightMenu }) => {
  const renderItem = () => {
    return itemList.map((item, index) => {
      return (
        <div
          className="item"
          id={item.styleId}
          onClick={item.onItemClick}
          key={index}
        >
          {item.title}
        </div>
      );
    });
  };
  return (
    <div className="navBar">
      {renderItem()}
      {rightMenu ? rightMenu : null}
    </div>
  );
};

export default SecondaryNav;
