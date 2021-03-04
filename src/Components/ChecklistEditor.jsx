import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

/* Firebase */
import { AuthContext } from "../Auth";
import firebaseApp from "../firebaseApp";
import ChecklistSchema from "../Models/ChecklistSchema";

import "../index.css";

// React-bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import Utils from "../utilities";

// Components

import NavigationBar from "./NavigationBar";

const ChecklistEditor = () => {
  const { currentUser } = useContext(AuthContext);
  const db = firebaseApp.firestore();
  const history = useHistory();

  // State
  const [newField, setNewField] = useState("");
  const [checklistName, setChecklistName] = useState("");
  const [fields, setFields] = useState([]);

  //Methods
  const saveChecklist = async () => {
    let checklist = ChecklistSchema;
    checklist = {
      ...checklist,
      fields,
      date: new Date(),
      creatorid: currentUser.uid,
      name: checklistName,
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
    <React.Fragment>
      <NavigationBar />
      <div className="row fabric-background" style={styles.row}>
        <div className="col-12">
          <h1 className="page-title">
            Create a new checklist or edit an existing one:
          </h1>
        </div>
      </div>
      <div
        className="row fabric-background"
        style={{ ...styles.row, minHeight: "100vh" }}
      >
        <div className="col-md-4">
          <div className="d-flex flex-column my-checklist">
            <div className="block-container">
              <h4 className="block-title">Checklist Name:</h4>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Choose a name for the new checklist"
                  aria-label="Checklist name"
                  aria-describedby="basic-addon2"
                  value={checklistName}
                  onChange={(e) => {
                    setChecklistName(e.target.value);
                  }}
                />
              </InputGroup>
            </div>

            <div className="block-container">
              <h4 className="block-title handwritten">
                Add this item to the list:
              </h4>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Add the name of an item to add on the list"
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
          </div>
        </div>
        <div className="col-md-4">
          {" "}
          <div className="block-container">
            <h4 className="block-title">
              This items are currently in this checklist:
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
        </div>
        <div className="col-md-4">
          {" "}
          <div className="d-flex flex-column justify-content-between align-items-center block-container">
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
    </React.Fragment>
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
  row: {
    boxSizing: "border-box",
    padding: "10px",
    margin: "0px",
  },
};

export default ChecklistEditor;
