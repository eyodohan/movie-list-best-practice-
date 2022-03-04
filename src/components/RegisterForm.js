import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "../common/Input";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: schema[input.name] };
    const result = Joi.validate(obj, subSchema);
    return result.error ? result.error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(data, schema, options);
    const newErrors = { ...errors };
    if (result.error) {
      result.error.details.map(
        (item) => (newErrors[item.path[0]] = item.message)
      );
      return newErrors;
    }
  };

  const disabled = validate();

  const handleChange = ({ target: input }) => {
    const newError = { ...errors };
    const errorMessage = validateProperty(input);
    errorMessage
      ? (newError[input.name] = errorMessage)
      : delete newError[input.name];
    setErrors(newError);

    const userData = { ...data };
    userData[input.name] = input.value;
    setData(userData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = validate();
    if (newError) return setErrors(newError);

    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const response = await userService.register(data);
      // console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const err = { ...errors };
        err.username = error.response.data;
        setErrors(err);
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="email"
          value={data.username}
          error={errors?.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={data.password}
          error={errors?.password}
          onChange={handleChange}
        />
        <Input
          name="name"
          label="Name"
          type="text"
          value={data.name}
          error={errors?.name}
          onChange={handleChange}
        />
        <button className="btn btn-primary" disabled={disabled}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
