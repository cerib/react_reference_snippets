import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAlert,
  registerUser,
  clearErrors,
  loadUser,
} from "../../redux/actions";

function Register(props) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    dispatch(loadUser());
    //TODO make errors have an error code instead.
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      dispatch(setAlert(error, "danger"));
      dispatch(clearErrors());
    }
  }, [error, dispatch, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //validaton
    if (name === "" || email === "" || password === "") {
      dispatch(setAlert("Please enter all fields", "danger"));
    } else if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(
        registerUser({
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            autoComplete="username"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="new-password"
            required
            minLength="6"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            autoComplete="new-password"
            value={password2}
            required
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

export default Register;
