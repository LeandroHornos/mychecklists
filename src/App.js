import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import ChecklistEditor from "./Components/ChecklistEditor";

function App() {
  const currentLang = "es";
  return (
    <Router>
      <div style={{ boxSizing: "border-box" }}>
        <Switch>
          <Route exact path="/">
            <ChecklistEditor />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
