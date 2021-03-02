import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

/* Firebase */
import { AuthContext } from "../Auth";
import firebaseApp from "../firebaseApp";

import "../index.css";

// React-bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import ChecklistSchema from "../Models/ChecklistSchema";

import Utils from "../utilities";

const ChecklistEditor = () => {
  const { currentUser } = useContext(AuthContext);
  const db = firebaseApp.firestore();
  const history = useHistory();

  // State
  const [newField, setNewField] = useState("");
  const [fields, setFields] = useState([]);

  //Methods
  const saveChecklist = async () => {
    let checklist = ChecklistSchema;
    checklist = {
      ...checklist,
      fields,
      date: new Date(),
      creatorid: currentUser.uid,
    };
    try {
      await db.collection("checklists").add(checklist);
      console.log("se ha creado una checklist", checklist);
      history.push("./");
    } catch (error) {
      console.log(error);
    }
  };

  const addFieldToChecklist = () => {
    const newFields = [
      ...fields,
      { name: newField, status: "unchecked", id: Utils.makeId(8) },
    ];
    setFields(newFields);
    setNewField("");
    console.log(newFields);
  };

  const clearChecklist = () => {
    setFields([]);
  };
  return (
    <div className="row" style={styles.row}>
      <div className="col-md-4"></div>
      <div className="col-md-4" style={styles.centerColumn}>
        <div className="d-flex flex-column justify-content-around align-items-center my-checklist">
          <h1 className="page-title">Checklist Editor</h1>

          <div style={styles.blockContainer}>
            <h4 className="block-title">
              This items are currently in my checklist:
            </h4>
            <ul style={styles.itemsList}>
              {fields.length === 0 && <p>There are no items yet</p>}
              {fields.map((field) => {
                return (
                  <div
                    key={field.id}
                    className="checklist-editor-row d-flex justify-content-between align-items-center"
                  >
                    <label>{field.name}</label>
                    <Button variant="outline-danger">x</Button>
                  </div>
                );
              })}
            </ul>
          </div>
          <div style={styles.blockContainer}>
            <h4 className="block-title">Add this item to my checklist:</h4>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Nombre del item"
                aria-label="Nombre del item"
                aria-describedby="basic-addon2"
                value={newField}
                onChange={(e) => {
                  setNewField(e.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    addFieldToChecklist();
                  }}
                >
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div
            style={styles.blockContainer}
            className="d-flex flex-column justify-content-between align-items-center"
          >
            <h4 className="block-title">Do this with my checklist:</h4>
            <Button
              onClick={() => {
                saveChecklist();
              }}
              block
              variant="outline-success"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                clearChecklist();
              }}
              block
              variant="outline-info"
            >
              Clear
            </Button>
            <Button block variant="outline-danger" disabled>
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

export default ChecklistEditor;
