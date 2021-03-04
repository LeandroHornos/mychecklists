import React from "react";

// React-bootstrap
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";

const Dashboard = () => {
  // Router
  const history = useHistory();
  return (
    <div className="row checklist-wall-window">
      <div className="col-md-4"></div>
      <div className="col-md-4" style={styles.centerColumn}>
        <div className="d-flex flex-column justify-content-around align-items-center">
          <h4
            style={{ color: "white", fontSize: "1.8em", padding: "20px 0px" }}
          >
            Welcome to MyChecklists
          </h4>

          <Button
            onClick={() => {
              history.push("/checklists");
            }}
            block
            variant="outline-primary"
            style={{ color: "white", padding: "10px 0px", margin: "10px 0px" }}
          >
            {" "}
            View My Checklists
          </Button>
          <Button
            onClick={() => {
              history.push("/edit");
            }}
            block
            variant="outline-primary"
            style={{ color: "white", padding: "10px 0px", margin: "10px 0px" }}
          >
            {" "}
            New Checklist
          </Button>
        </div>
      </div>
      <div className="col-md-4"></div>
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
    minHeight: "100vh",
  },
};
export default Dashboard;
