import React, { useState, useEffect, useContext } from "react";
import Utils from "../utilities";

// Firebase
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

// Router
import { Link } from "react-router-dom";

// Language
import { LanguageContext } from "../Lang";

// Components

import NavigationBar from "./NavigationBar";
import Pin from "./Subcomponents/Pin";

const ChecklistWall = (props) => {
  // Firestore db
  const db = firebaseApp.firestore();
  const ref = db.collection("checklists");
  // Auth:
  const { currentUser } = useContext(AuthContext);
  //Lang
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.ChecklistWall;
  // State:
  const [checklists, setChecklists] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("vamos a buscar las checklists de", currentUser);
      try {
        await ref

          .where("creatorid", "==", currentUser.uid)
          .get()
          .then((results) => {
            const lists = results.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setChecklists(Utils.groupAsTriplets(lists));
            console.log("estas son las checklists", lists);
            // setLoading(false);
          });
      } catch (error) {
        console.log(error);
        // history.push("/error");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row fabric-background" style={{ margin: "0px" }}>
        <div className="col-12">
          <h1 className="page-title">{txt.title}</h1>
        </div>
      </div>
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
                      <Pin />
                      <Link to={"/view/" + checklist.id}>
                        <h4
                          className="handwritten checklist-card-title"
                          style={{ textAlign: "center", fontSize: "2em" }}
                        >
                          {checklist.name}
                        </h4>
                      </Link>

                      <ul style={{ listStyle: "none" }}>
                        {checklist.items.map((item, index) => {
                          if (index > 9) return; //Limito vista previa a 10 elementos
                          const op = 1 / (0.25 * (index + 0.01)); //Bajo la opacidad en funcion al index. 2 parámetros de ajuste (evito dividir por 0)
                          return (
                            <li
                              key={Utils.makeId(4)}
                              style={{ fontSize: "1.3em", opacity: `${op}` }}
                              className="handwritten"
                            >
                              {item.name}
                            </li>
                          );
                        })}
                        {checklist.items.length > 10 && <li>...</li>}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ChecklistWall;
