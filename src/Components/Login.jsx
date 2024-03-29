import React, { useState, useContext } from "react";

import { useHistory, Link } from "react-router-dom";

// Firebase
import firebaseApp from "../firebaseApp";
// import { AuthContext } from "../Auth";

// Language
import { LanguageContext } from "../Lang";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import BasicNavBar from "./BasicNavBar";

function Login() {
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.Login;
  const gtxt = dictionary.general;

  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignIn = async () => {
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      history.push("/home");
      console.log("usuario logueado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checklist-wall-window">
      <BasicNavBar />
      <div className="row" style={styles.row}>
        <div className="col-md-3"></div>
        <div
          className="col-md-6 d-flex flex-column justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Link
            style={{
              fontSize: "3.5em",
              textAlign: "center",
              color: "rgba(250,250,250,0.55)",
            }}
            to="/"
          >
            Checklist<span style={{ color: "red" }}>-</span>me
          </Link>
          <h1 className="page-title" style={{ fontSize: "2.2em" }}>
            {gtxt.login}
          </h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ color: "white" }}>{gtxt.email}</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ color: "white" }}>
                {gtxt.password}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              block
              variant="success"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              {gtxt.login}
            </Button>
            <Button
              block
              variant="dark"
              onClick={(e) => {
                history.push("/register");
              }}
              style={{ color: "white" }}
            >
              {txt.noAccount}
            </Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

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
    minHeight: "80vh",
  },
};

export default Login;
