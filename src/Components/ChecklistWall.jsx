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
          .get()
          .where("creatorid", "==", currentUser.uid)
          .then((items) => {
            const lists = items.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setChecklists(Utils.groupAsTriplets(lists));
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
    <div>
      {checklists.map((triplet) => {
        return (
          <div className="row" key={Utils.makeId(4)}>
            {triplet.map((checklist) => {
              return (
                <div className="col-md-4">
                  <h4 key={checklist.uid}>{checklist.name}</h4>
                  <ul>
                    {checklist.fields.map((field) => {
                      return <li key={field.id}>{field.name}</li>;
                    })}
                  </ul>
                  ;
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
