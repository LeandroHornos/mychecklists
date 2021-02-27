import React from "react";

// React-bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { useHistory } from "react-router-dom";

const Dashboard = () => {
  // Router
  const history = useHistory();
  return (
    <div className="row" style={styles.row}>
      <div className="col-md-4"></div>
      <div className="col-md-4" style={styles.centerColumn}>
        <div className="d-flex flex-column justify-content-around align-items-center">
          <h4>Welcome to MyChecklists</h4>

          <Button onClick={() => {
              history.push("/checklists");
            }} block> View My Checklists</Button>
          <Button
            onClick={() => {
              history.push("/edit");
            }}
            block
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
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: { boxSizing: "border-box", padding: "0px 10px", margin: "0px" },
};
export default Dashboard;
