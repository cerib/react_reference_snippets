import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAlert,
  clearErrors,
  loginUser,
  loadUser,
} from "../../redux/actions";

function Login(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);

  const { email, password } = user;

  useEffect(() => {
    dispatch(loadUser());
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Email or password are incorrect") {
      dispatch(setAlert(error, "danger"));
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, props.history]);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <div className="bg-light m-1">
        <i className="fa fa-info-circle " aria-hidden="true" />{" "}
        {"Don't want to sign up? Try the read only account! "}
        <ul className="m-1">
          <li>Email: example@example.com</li>
          <li>Password: password</li>
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="password"
            required
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

export default Login;
