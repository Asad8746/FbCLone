import React from "react";
import FormError from "../FormError";
import "./index.style.scss";
const FormField = ({
  label,
  type,
  name,
  placeholder,
  required,
  input,
  meta,
}) => {
  return (
    <div className={`form-field`}>
      <input
        className="form-field__input"
        type={type}
        name={name}
        placeholder={placeholder}
        {...input}
        required={required}
      />
      <label className="form-field__label">{label}</label>
      <FormError meta={meta} />
    </div>
  );
};

FormField.defaultProps = {
  required: false,
};
export default FormField;
