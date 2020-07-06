import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alerts />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route component={About}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
