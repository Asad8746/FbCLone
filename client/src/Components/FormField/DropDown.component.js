import React from "react";
import FormError from "./FormError.component";
const DropDown = ({ input, meta, label }) => {
  return (
    <div className="required field">
      <label>{label}</label>
      <select className="ui selection dropdown" {...input}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <FormError meta={meta} />
    </div>
  );
};

export default DropDown;
