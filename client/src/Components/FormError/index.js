import React from "react";
import "./index.style.scss";
const FormError = ({ meta }) => {
  const { touched, error } = meta;
  if (touched && error) {
    return <div className="form__error">{error}</div>;
  }
  return <></>;
};

export default FormError;
