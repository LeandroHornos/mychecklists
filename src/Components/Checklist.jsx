import React, { useEffect, useState } from "react";

// React-bootstrap
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

// Firebase
import firebaseApp from "../firebaseApp";
import firebase from "firebase/app";

// React-Bootstrap
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Components
import NavigationBar from "./NavigationBar";
import CheckButtons from "./CheckButtons";

// Some Functions
import Utils from "../utilities";

const Checklist = () => {
  const { id } = useParams();
  // Router
  const history = useHistory();

  const db = firebaseApp.firestore();
  const ref = db.collection("checklists");

  const [checklist, setChecklist] = useState({});
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  const [checklistStatus, setChecklistStatus] = useState("incomplete");

  const updateFieldStatus = (updatedFieldId, newStatus) => {
    let updatedFields = fields.map((currentField) => {
      if (currentField.id === updatedFieldId) {
        return { ...currentField, status: newStatus };
      } else {
        return currentField;
      }
    });
    console.log("se ha actualizado el campo:", updatedFields);
    setFields(updatedFields);
  };

  const updateChecklistStatus = () => {
    let newStatus = "complete";
    const stillIncomplete = fields.some(
      (field) => field.status === "unchecked"
    );
    if (stillIncomplete || fields.length === 0) {
      newStatus = "incomplete";
    }
    setChecklistStatus(newStatus);
  };

  const saveSnapshotToHistory = async () => {
    if (checklistStatus == "incomplete") return; // No guardar si no se han tildado todos los campos
    let snapshot = { id: Utils.makeId(10), items: fields, date: Date.now() };

    try {
      await ref.doc(id).update({
        history: firebase.firestore.FieldValue.arrayUnion(snapshot),
      });
      console.log("se ha añadido una snapshot al historial", snapshot);
      history.push("/checklists");
    } catch (error) {
      console.log(
        "oops, no se ha podido guardar el snapshot en el historal :(",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Deseo ver la checklist con este id:", id);
        const itemdoc = await ref.doc(id).get();
        const data = itemdoc.data();
        console.log("obtuve este resultado", data);
        setChecklist(data);
        setFields(data.fields);
        setLoading(false);
      } catch (error) {
        console.log(
          "Item.jsx dice: Ha ocurrido un error al tratar de obtener el item de la base de datos:",
          error
        );
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateChecklistStatus();
  }, [fields]);

  return (
    <div className="checklist-wall-window">
      <NavigationBar />
      <div className="row fabric-background" style={styles.row}>
        <div className="col-12">
          <h1 className="page-title">Lets check this!</h1>
        </div>
      </div>

      <div className="row" style={styles.row}>
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8" style={styles.centerColumn}>
          <div className="block-container d-flex flex-column justify-content-around align-items-center">
            <div style={{ width: "100%", padding: "10px" }}>
              <div className="row">
                <div className="col-12">
                  <h4
                    className="block-title"
                    style={{ textAlign: "center", fontSize: "2em" }}
                  >
                    {checklist.name}
                  </h4>
                  <Alert variant="outline-dark" style={{ textAlign: "center" }}>
                    Click yes or ignore on every item on the list
                  </Alert>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <h4 className="block-title">Item:</h4>
                </div>
                <div className="col-4">
                  <div className="d-flex justify-content-between">
                    <span style={{ textAlign: "center", color: "grey" }}>
                      ignore
                    </span>
                    <span style={{ textAlign: "center", color: "green" }}>
                      yes
                    </span>
                    <span style={{ textAlign: "center", color: "red" }}>
                      no
                    </span>
                  </div>
                </div>
              </div>
              {!loading &&
                fields.map((field) => {
                  return (
                    <div className="row" key={field.id}>
                      <div className="col-8">
                        <p>{field.name}</p>
                      </div>
                      <div className="col-4">
                        <CheckButtons
                          field={field}
                          updateFieldStatus={updateFieldStatus}
                        />
                      </div>
                    </div>
                  );
                })}
              {checklistStatus === "complete" ? (
                <Alert variant="success" style={{ textAlign: "center" }}>
                  All Checked!
                </Alert>
              ) : (
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  There are still some unchecked items on the list
                </Alert>
              )}
              {checklistStatus === "complete" ? (
                <div>
                  <Button
                    block
                    variant="success"
                    onClick={() => {
                      console.log("Taking a Snapshot.... click!:", fields);
                      saveSnapshotToHistory();
                    }}
                  >
                    Save to log
                  </Button>
                  <Button
                    block
                    variant="primary"
                    onClick={() => {
                      history.push("/checklists");
                    }}
                  >
                    Discard
                  </Button>
                </div>
              ) : (
                <Button block variant="danger">
                  Discard
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </div>
  );
};

const ChecklistButtonGroup = (props) => {
  return (
    <div
      className="d-flex justify-content-between checklist-button-group"
      onChange={(e) => {
        console.log(e.target.value, "field: " + props.field.id);
        props.updateFieldStatus(props.field.id, e.target.value);
      }}
    >
      <input type="radio" name={`option-${props.field.id}`} value="ignored" />
      <input type="radio" name={`option-${props.field.id}`} value="checked" />
      <input
        type="radio"
        name={`option-${props.field.id}`}
        value="unchecked"
        defaultChecked
      />
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
  },
};
export default Checklist;
