import React from "react";

const RadioBtn = ({ type, input, label, ...rest }) => {
  return (
    <div className="field">
      <label id="radio-label">
        {" "}
        <input type={type} {...input} {...rest} /> {label}
      </label>
    </div>
  );
};

export default RadioBtn;
