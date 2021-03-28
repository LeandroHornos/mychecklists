import React, { useContext } from "react";

// Language
import { LanguageContext } from "../Lang";

/* Firebase */
import { AuthContext } from "../Auth";

// React-bootstrap
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";

import BasicNavBar from "./BasicNavBar";

const LandingPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.LandingPage;
  // Router
  const history = useHistory();
  return (
    <div className="checklist-wall-window">
      <BasicNavBar />
      <div className="row " style={styles.row}>
        <div className="col-md-3"></div>
        <div className="col-md-6" style={styles.centerColumn}>
          <div
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ color: "rgb(200,200,200)" }}
          >
            <h4>{txt.welcomeTo}</h4>
            <h2
              style={{ color: "white", fontSize: "3em", padding: "20px 0px" }}
            >
              My<span style={{ color: "red" }}>-</span>Checklists
            </h2>
            <p style={{ color: "white" }}>{txt.slogan}</p>

            <Button
              onClick={() => {
                currentUser ? history.push("/home") : history.push("/login");
              }}
              block
              variant="outline-success"
              style={{
                color: "white",
                padding: "10px 0px",
                margin: "10px 0px",
              }}
            >
              {txt.login}
            </Button>
            <Button
              onClick={() => {
                currentUser ? history.push("/home") : history.push("/register");
              }}
              block
              variant="outline-success"
              style={{
                color: "white",
                padding: "10px 0px",
                margin: "10px 0px",
              }}
            >
              {txt.createAccount}
            </Button>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

const styles = {
  h1: { padding: "40px 10px" },
  h4: { padding: "20px 0px", width: "100%" },
  centerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    boxSizing: "border-box",
    padding: "0px 10px",
    margin: "0px",
    minHeight: "80vh",
  },
};
export default LandingPage;
