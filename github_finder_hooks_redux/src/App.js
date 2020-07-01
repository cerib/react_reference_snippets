import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  searchUsers,
  clearUsers,
  fetchUserAndRepos,
} from "./actions";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import Clear from "./components/users/Clear";
import User from "./components/users/User";
import NotFound from "./components/pages/NotFound";

export default function App() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user).user; //select user property from the resulting object (check userReducer.js)
  const repos = useSelector((state) => state.user).repos;
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const dispatchOnMount = useDispatch();

  useEffect(() => {
    dispatchOnMount(fetchUsers());
  }, [dispatchOnMount]);

  const onSubmit = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      dispatch(fetchUsers());
    } else {
      dispatch(searchUsers(searchTerm));
    }
  };

  const onClear = () => {
    dispatch(clearUsers());
  };

  const fetchUserAndReposCB = useCallback(
    (username) => {
      dispatch(fetchUserAndRepos(username));
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"></Navbar>
        <div className="container">
          <Switch>
            {
              <Route
                exact
                path="/"
                render={(props) => (
                  <React.Fragment>
                    <Search onSubmit={onSubmit}></Search>
                    {users.length > 0 ? <Clear onClear={onClear} /> : null}
                    <Users loading={loading} users={users}></Users>
                  </React.Fragment>
                )}
              />
            }
            <Route exact path="/about" component={About} />
            {
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUserAndRepos={fetchUserAndReposCB}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            }
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
