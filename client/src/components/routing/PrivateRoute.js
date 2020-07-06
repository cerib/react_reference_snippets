import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import Login from "../../components/pages/Login";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated || loading) {
          return <Login />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
