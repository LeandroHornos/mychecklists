import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

/* Firebase */
import { AuthContext } from "../Auth";
import firebaseApp from "../firebaseApp";
import ChecklistSchema from "../Models/ChecklistSchema";

import { LanguageContext } from "../Lang";

import "../index.css";

// React-bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import Pin from "./Subcomponents/Pin";

import Utils from "../utilities";

// Components

import NavigationBar from "./NavigationBar";

const ChecklistEditor = () => {
  const { currentUser } = useContext(AuthContext);
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.ChecklistEditor;
  const gtxt = dictionary.general;
  const db = firebaseApp.firestore();
  const history = useHistory();

  // State
  const [newItem, setNewItem] = useState("");
  const [checklistName, setChecklistName] = useState("");
  const [items, setItems] = useState([]);

  //Methods
  const saveChecklist = async () => {
    let checklist = ChecklistSchema;
    checklist = {
      ...checklist,
      items,
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

  const addItemToChecklist = () => {
    const newItems = [
      ...items,
      { name: newItem, status: "unchecked", id: Utils.makeId(8) },
    ];
    setItems(newItems);
    setNewItem("");
    console.log(newItems);
  };

  const removeItemFromChecklist = (itemId) => {
    const filteredItems = items.filter((item) => {
      return item.id !== itemId;
    });
    setItems(filteredItems);
  };

  const updateItem = (itemId, newName) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, name: newName };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const clearChecklist = () => {
    setItems([]);
  };

  // Render
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row fabric-background" style={styles.row}>
        <div className="col-12">
          <h1 className="page-title">{txt.title}</h1>
        </div>
      </div>
      <div
        className="row fabric-background"
        style={{ ...styles.row, minHeight: "100vh" }}
      >
        <div className="col-md-4">
          <div className="d-flex flex-column my-checklist">
            <div className="block-container">
              <h4 className="block-title">{txt.checklistName}:</h4>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder={txt.chklstNamePlaceholder}
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
              <h4 className="block-title handwritten">{txt.addItem}</h4>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder={txt.addItemPlaceholder}
                  aria-label="Nombre del item"
                  aria-describedby="basic-addon2"
                  value={newItem}
                  onChange={(e) => {
                    setNewItem(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      addItemToChecklist();
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
          <div
            className="block-container text-center"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <Pin />
            <h4 className="block-title">
              {checklistName !== "" ? checklistName : txt.chklstPreview}
            </h4>
            {items.length === 0 && <p>{txt.noItemsYet}</p>}
            <ul>
              {items.map((field) => {
                return (
                  <li key={field.id} className="d-flex justify-content-between">
                    <ChecklistItemEditor
                      item={field}
                      dictionary={{ txt, gtxt }}
                      removeItemFromChecklist={removeItemFromChecklist}
                      updateItem={updateItem}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          {" "}
          <div
            className="d-flex flex-column justify-content-start align-items-center block-container"
            style={{ minHeight: "60vh" }}
          >
            <h4 className="block-title">{txt.doThis}:</h4>
            <Button
              onClick={() => {
                saveChecklist();
              }}
              block
              variant="outline-success"
            >
              {gtxt.save}
            </Button>
            <Button
              onClick={() => {
                clearChecklist();
              }}
              block
              variant="outline-info"
            >
              {gtxt.clear}
            </Button>
            <Button block variant="outline-danger" disabled>
              {gtxt.delete}
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const ChecklistItemEditor = (props) => {
  const [mode, setMode] = useState("read");
  const [name, setName] = useState(props.item.name);
  const { gtxt } = props.dictionary;
  return (
    <div className="row" style={{ ...styles.row, width: "100%" }}>
      <div className="col-6">
        {mode === "read" ? (
          <p style={{ textAlign: "left", padding:"8px 0px" }}>{props.item.name}</p>
        ) : (
          <Form.Control
            as="textarea"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        )}
      </div>
      <div className="col-3">
        {mode === "read" ? (
          <Button
            style={{ color: "rgb(50,150,60)" }}
            variant="link"
            onClick={() => {
              setMode("edit");
            }}
          >
            {gtxt.edit}
          </Button>
        ) : (
          <Button
            style={{ color: "rgb(50,150,60)" }}
            variant="link"
            onClick={() => {
              props.updateItem(props.item.id, name);
              setMode("read");
            }}
          >
            Aceptar
          </Button>
        )}
      </div>
      <div className="col-3">
        {mode === "read" ? (
          <Button
            style={{ color: "red" }}
            variant="link"
            onClick={() => {
              props.removeItemFromChecklist(props.item.id);
            }}
          >
            {gtxt.delete}
          </Button>
        ) : (
          <Button
            style={{ color: "red" }}
            variant="link"
            onClick={() => {
              setMode("read");
            }}
          >
            Cancelar
          </Button>
        )}
      </div>
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
  row: {
    boxSizing: "border-box",
    padding: "10px",
    margin: "0px",
  },
};

export default ChecklistEditor;
