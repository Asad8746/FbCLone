import React from "react";

const FormError = ({ meta }) => {
  const { touched, error } = meta;
  if (touched && error) {
    return <div className="ui error message">{error}</div>;
  }
  return <></>;
};

export default FormError;
