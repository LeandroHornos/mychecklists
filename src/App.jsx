import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Firebase */
import { AuthContext } from "./Auth";

// Components
import ChecklistEditor from "./Components/ChecklistEditor";

function App() {
  const { currentUser } = useContext(AuthContext);
  const currentLang = "es";
  return (
    <div style={{ boxSizing: "border-box" }}>
      <ChecklistEditor />
    </div>
  );
}

export default App;
