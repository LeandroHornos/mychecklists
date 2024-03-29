import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Firebase */
import { AuthContext } from "./Auth";

// Components
import About from "./Components/About";
import Dashboard from "./Components/Dashboard";
import Checklist from "./Components/Checklist";
import ChecklistEditor from "./Components/ChecklistEditor";
import ChecklistWall from "./Components/ChecklistWall";
import Register from "./Components/Register";
import Login from "./Components/Login";
import SignOut from "./Components/SignOut";
import LandingPage from "./Components/LandingPage";

import "./App.css";

function App() {
  // const currentLang = "es";
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <div style={{ boxSizing: "border-box" }}>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Dashboard />
          </Route>
          <Route exact path="/edit">
            <ChecklistEditor />
          </Route>
          <Route exact path="/view/:id">
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
          <Route exact path="/exit">
            <SignOut />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
