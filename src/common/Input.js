import React from "react";

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        id={name}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default Input;
