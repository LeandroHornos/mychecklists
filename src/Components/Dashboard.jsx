import React from "react";

// React-bootstrap
import Button from "react-bootstrap/Button";

import NavigationBar from "./NavigationBar";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  // Router
  const history = useHistory();
  return (
    <div className="checklist-wall-window">
      <NavigationBar />
      <div className="row " style={styles.row}>
        <div className="col-md-4"></div>
        <div className="col-md-4" style={styles.centerColumn}>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <h4
              style={{ color: "white", fontSize: "1.8em", padding: "20px 0px" }}
            >
              What would you like to do?
            </h4>

            <Button
              onClick={() => {
                history.push("/checklists");
              }}
              block
              variant="outline-success"
              style={{
                color: "white",
                padding: "10px 0px",
                margin: "10px 0px",
              }}
            >
              View My Checklists
            </Button>
            <Button
              onClick={() => {
                history.push("/edit");
              }}
              block
              variant="outline-success"
              style={{
                color: "white",
                padding: "10px 0px",
                margin: "10px 0px",
              }}
            >
              {" "}
              New Checklist
            </Button>
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
export default Dashboard;
