import React from "react";

// const Input = ({ name, label, value, error, type = "text", onChange }) => {
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input name={name} {...rest} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
