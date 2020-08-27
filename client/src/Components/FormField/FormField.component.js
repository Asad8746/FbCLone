import React from "react";
import FormError from "./FormError.component";

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
      <FormError meta={meta} />
    </div>
  );
};

export default FormField;
