import React, { useState } from "react";

import "../index.css";

// React-bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Checklist = () => {
  const [newField, setNewField] = useState("");
  const [checklist, setChecklist] = useState([]);

  const addItemToChecklist = (itemName) => {
    console.log(itemName);
    return;
  };
  return (
    <div className="row" style={styles.row}>
      <div className="col-md-4"></div>
      <div className="col-md-4" style={styles.centerColumn}>
        <div className="d-flex flex-column justify-content-around align-items-center my-checklist">
          <h1 className="page-title">My Checklist</h1>

          <div style={styles.blockContainer}>
            <h4
              className="block-title"
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              Checklist Name
            </h4>
            <ul style={styles.itemsList}>
              {checklist.length === 0 && <p>There are no items yet</p>}
              {checklist.map((field) => {
                return (
                  <div className="checklist-editor-row d-flex justify-content-between align-items-center">
                    <label>{field.name}</label>
                    <Button variant="outline-danger">x</Button>
                  </div>
                );
              })}
            </ul>
          </div>

          <div
            style={styles.blockContainer}
            className="d-flex flex-column justify-content-between align-items-center"
          >
            <h4 className="block-title">Do this with my checklist:</h4>
            <Button block variant="outline-success">
              Save
            </Button>
            <Button block variant="outline-info">
              Clear
            </Button>
            <Button block variant="outline-danger">
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

const styles = {
  h4: { padding: "20px 0px", width: "100%" },
  blockContainer: {
    width: "100%",
    padding: "20px 10px",
    border: "solid",
    borderWidth: "1px",
    borderColor: "rgb(200,200,200)",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.2)",
  },
  itemsList: { width: "100%" },
  actionButtonsContainer: {
    width: "100%",
    padding: "20px 10px",
  },
  checklistEditorRow: {
    padding: "8px",
    marginBottom: "10px",
    border: "solid",
    borderColor: "rgb(200,200,200)",
    borderWidth: "1px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.2)",
  },
  centerColumn: { minHeight: "100vh" },
  row: { boxSizing: "border-box", padding: "10px", margin: "0px" },
};

export default Checklist;
