import React, { useState, useEffect, useContext } from "react";
import Utils from "../utilities";

// Firebase
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

// Router
import { useHistory } from "react-router-dom";

const ChecklistWall = (props) => {
  // const triplets = Utils.groupAsTriplets(props.data);

  const db = firebaseApp.firestore();
  const ref = db.collection("checklists");

  // Auth:
  const { currentUser } = useContext(AuthContext);

  // Router
  const history = useHistory();

  // State:
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true); // Carga de la vista principal

  useEffect(() => {
    // Cargar los inventarios al acceder a esta ruta:

    const fetchData = async () => {
      console.log("vamos a buscar las checklists de", currentUser);
      try {
        await ref

          .where("creatorid", "==", currentUser.uid)
          .get()
          .then((items) => {
            const lists = items.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setChecklists(Utils.groupAsTriplets(lists));
            console.log("estas son las checklists", lists);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        // history.push("/error");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, currentUser);

  return (
    <div className="checklist-wall-window">
      {checklists.map((triplet) => {
        return (
          <div
            className="row"
            key={Utils.makeId(4)}
            style={{ width: "100%", margin: "auto" }}
          >
            {triplet.map((checklist) => {
              return (
                <div key={Utils.makeId(4)} className="col-md-4">
                  <div className="checklist-card">
                    <h4
                      className="handwritten checklist-card-title"
                      style={{ textAlign: "center", fontSize: "2em" }}
                    >
                      {checklist.name}
                    </h4>
                    <ul style={{ listStyle: "none" }}>
                      {checklist.fields.map((field) => {
                        return (
                          <li
                            key={Utils.makeId(4)}
                            style={{ fontSize: "1.3em" }}
                            className="handwritten"
                          >
                            {field.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChecklistWall;
