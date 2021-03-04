import React, { useEffect } from "react";

// React-bootstrap
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

const Checklist = () => {
  const { id } = useParams();
  // Router
  const history = useHistory();

  useEffect(() => {
    console.log("Deseo ver la checklist con este id:",id);
  }, []);
  return (
    <div className="checklist-wall-window">
      <div className="row fabric-background" style={styles.row}>
        <div className="col-12">
          <h1 className="page-title">View Checklist</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4" style={styles.centerColumn}>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <h4
              style={{ color: "white", fontSize: "1.8em", padding: "20px 0px" }}
            >
              Welcome to MyChecklists
            </h4>
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
    minHeight: "100vh",
  },
};
export default Checklist;
