import React from "react";

const renderValidationError = ({ touched, error }) => {
  if (touched && error) {
    return <div className="ui error message">{error}</div>;
  }
};

const FormField = ({
  label,
  type,
  name,
  placeholder,
  input,
  meta,
  required,
}) => {
  const className = !required ? "field" : "required field";

  return (
    <div className={className}>
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeholder} {...input} />
      {renderValidationError(meta)}
    </div>
  );
};

export default FormField;
