import React from "react";

const MenuItem = ({ icon, onClick }) => {
  return (
    <div className="menu-right__item" onClick={onClick}>
      {icon}
    </div>
  );
};

export default MenuItem;
