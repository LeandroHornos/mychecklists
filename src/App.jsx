import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// React-bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function App() {
  const [newField, setNewField] = useState("");
  const [fields, setFields] = useState([]);

  const addItemToChecklist = (itemName) => {
    console.log(itemName);
    return;
  };
  return (
    <div className="App">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="d-flex flex-column justify-content-center align-items-center my-checklist">
            <h1>My Checklist</h1>
            <hr />
            <ul style={{width: "100%"}}>
              {fields.map((field) => {
                return (
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ width: "100%", backgroundColor: "red" }}
                  >
                    <label>{field}</label>
                    <input type="radio" />
                  </div>
                );
              })}
            </ul>
            <p>Add new item to checklist</p>
            <InputGroup className="mb-6">
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
                    const newFields = [...fields, newField];
                    setFields(newFields);
                    setNewField("");
                    console.log(newFields);
                  }}
                >
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default App;
