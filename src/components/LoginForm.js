import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import Input from "../common/Input";
import auth from "../services/authService";
import { useLocation, useNavigate } from "react-router";

const LoginForm = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state.from.pathname;

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: schema[input.name] };
    const result = Joi.validate(obj, subSchema);
    // console.log(result);
    return result.error ? result.error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(data, schema, options);
    console.log(result);
    const newErrors = { ...errors };

    if (!result.error) return null;

    result.error.details.map(
      (error) => (newErrors[error.path[0]] = error.message)
    );
    return newErrors;
  };

  const disabled = validate();

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    const newdata = { ...data };
    newdata[input.name] = input.value;
    setData(newdata);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (newErrors) return setErrors(newErrors);
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      await auth.login(data.username, data.password);

      // navigate(location.state.from, { replace: true });
      console.log("window" + from);
      window.location = from || "/";
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="text"
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
        <button className="btn btn-primary" disabled={disabled}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
