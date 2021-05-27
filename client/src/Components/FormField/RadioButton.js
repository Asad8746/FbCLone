import React from "react";
import "./radio.scss";
const RadioBtn = ({ type, input, label, ...rest }) => {
  return (
    <div className="radio-btn">
      <input
        className="radio-btn__input"
        name="gender"
        id={label}
        type={type}
        checked
        {...input}
        {...rest}
      />
      <label className="radio-btn__label" htmlFor={label}>
        <span className="radio-btn__custom"></span>
        {label}
      </label>
    </div>
  );
};

export default RadioBtn;
