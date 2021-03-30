import React, { useContext } from "react";

// React-bootstrap
import Button from "react-bootstrap/Button";

import NavigationBar from "./NavigationBar";
import { useHistory } from "react-router-dom";

import { LanguageContext } from "../Lang";

const About = () => {
  // Router
  const history = useHistory();
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.About;
  // const gtxt = dictionary.components.General

  return (
    <div className="checklist-wall-window">
      <NavigationBar />
      <div className="row " style={styles.row}>
        <div className="col-md-4"></div>
        <div className="col-md-4" style={styles.centerColumn}>
          <div
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ color: "white" }}
          >
            <h4 style={{ fontSize: "1.8em", padding: "5px 0px" }}>
              {txt.title}
            </h4>
            <h3 style={{ fontSize: "2em", padding: "10px 0px" }}>
              My<span style={{ color: "red" }}>-</span>Checklists
            </h3>
            <ul>
              <li>{txt.author}: Leandro Hornos</li>
              <li>{txt.copyright}: 2021</li>
              <li>{txt.rightsReserved}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4"></div>
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
export default About;
