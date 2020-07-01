import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import axios from "axios";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import Clear from "./components/users/Clear";
import User from "./components/users/User";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  let credentials = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

  const onSubmit = async (searchTerm) => {
    setLoading(true);
    if (searchTerm.trim() === "") {
      const response = await axios.get(
        `https://api.github.com/users?${credentials}`
      );
      setUsers(response.data);
    } else {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}&?${credentials}`
      );
      setUsers(response.data.items);
    }
    setLoading(false);
  };

  const onClear = () => {
    setUsers([]);
  };

  const getUserCB = useCallback(
    async (username) => {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}?${credentials}`
      );
      setUser(response.data);
      setLoading(false);
    },
    [credentials]
  );

  const getUserReposCB = useCallback(
    async (username) => {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?${credentials}`
      );
      setRepos(response.data);
      setLoading(false);
    },
    [credentials]
  );

  /*   const getUser = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}?${credentials}`
    );
    setUser(response.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?${credentials}`
    );
    setRepos(response.data);
    setLoading(false);
  }; */

  useEffect(() => {
    let credentials = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const fetchUsers = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users?${credentials}`
      );
      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"></Navbar>
        <div className="container">
          <Switch>
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
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUserCB}
                  getUserRepos={getUserReposCB}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
