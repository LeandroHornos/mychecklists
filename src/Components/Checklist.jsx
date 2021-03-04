import React, { useEffect, useState } from "react";

// React-bootstrap
// import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

// Firebase
import firebaseApp from "../firebaseApp";

import Button from "react-bootstrap/Button";

import NavigationBar from "./NavigationBar";

const Checklist = () => {
  const { id } = useParams();
  // Router
  // const history = useHistory();

  const db = firebaseApp.firestore();
  const ref = db.collection("checklists");

  const [checklist, setChecklist] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar los inventarios al acceder a esta ruta:

    const fetchData = async () => {
      try {
        console.log("Deseo ver la checklist con este id:", id);
        const itemdoc = await ref.doc(id).get();
        const data = itemdoc.data();
        console.log("obtuve este resultado", data);
        setChecklist(data);
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
  return (
    <div className="checklist-wall-window">
      <NavigationBar/>
      <div className="row fabric-background" style={styles.row}>
        <div className="col-12">
          <h1 className="page-title">My Checklist</h1>
        </div>
      </div>

      <div className="row" style={styles.row}>
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8" style={styles.centerColumn}>
          <div className="block-container d-flex flex-column justify-content-around align-items-center">
            <h4 className="checklist-title">{checklist.name}</h4>
            <div style={{ width: "100%", padding: "10px" }}>
              {!loading &&
                checklist.fields.map((field) => {
                  return (
                    <div className="row" key={field.id}>
                      <div className="col-8">
                        <p>{field.name}</p>
                      </div>
                      <div className="col-1">
                        <Button size="sm" variant="outline-dark">
                          i
                        </Button>
                      </div>
                      <div className="col-1">
                        <Button size="sm" variant="outline-success">
                          Y
                        </Button>
                      </div>
                      <div className="col-1">
                        <Button size="sm" variant="danger">
                          N
                        </Button>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  );
                })}
              <Button block variant="danger" style={{ marginTop: "40px" }}>
                Checklist is not complete yet!
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
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
  },
};
export default Checklist;
