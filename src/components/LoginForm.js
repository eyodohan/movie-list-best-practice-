import React, { useState } from "react";
import Input from "../common/Input";

const LoginForm = () => {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (newErrors) return setErrors(newErrors);

    console.log("submitted");
  };

  const validateProperty = (input) => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Username is required";
    }
    if (input.name === "password") {
      if (input.value.trim() === "") return "Password is required";
    }
  };

  const validate = () => {
    const newErrors = { ...errors };
    if (account.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (account.password.trim() === "") {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          error={errors?.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          error={errors?.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
