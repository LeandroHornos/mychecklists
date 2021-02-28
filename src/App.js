import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import Dashboard from "./Components/Dashboard";
import Checklist from "./Components/Checklist";
import ChecklistEditor from "./Components/ChecklistEditor";
import ChecklistWall from "./Components/ChecklistWall";
import Register from "./Components/Register";
import Login from "./Components/Login";

import "./App.css";

function App() {
  const currentLang = "es";
  return (
    <Router>
      <div style={{ boxSizing: "border-box" }}>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/edit">
            <ChecklistEditor />
          </Route>
          <Route exact path="/view">
            <Checklist />
          </Route>
          <Route exact path="/checklists">
            <ChecklistWall />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
