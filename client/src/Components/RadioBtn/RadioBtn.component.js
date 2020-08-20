import React from "react";

const renderValidationError = ({ touched, error }) => {
  if (touched && error) {
    return <div className="ui error message">{error}</div>;
  }
};

const FormField = ({ label, type, name, placeholder, input, meta }) => {
  return (
    <div className="field">
      <div className="ui radio checkbox">
        <input type={type} name={name} placeholder={placeholder} {...input} />
        <label>{label}</label>
        {renderValidationError(meta)}
      </div>
    </div>
  );
};

export default FormField;
