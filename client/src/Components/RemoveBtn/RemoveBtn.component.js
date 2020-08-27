import React from "react";

const GroupModalBtn = ({ title, onClick }) => {
  return (
    <button className="ui blue button" onClick={onClick}>
      {title}
    </button>
  );
};

export default GroupModalBtn;
