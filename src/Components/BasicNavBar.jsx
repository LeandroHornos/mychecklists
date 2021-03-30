import React, { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LangSelector from "./LangSelector";

import { LanguageContext } from "../Lang";

const BasicNavBar = () => {
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.NavigationBar;
  const gtxt = dictionary.general;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        My<span style={{ color: "red" }}>-</span>Checklists
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/checklists">Checklists</Nav.Link>
          <Nav.Link href="/edit">{txt.new}</Nav.Link> */}
          <NavDropdown title={txt.explore} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/login">{gtxt.login}</NavDropdown.Item>
            <NavDropdown.Item href="/register">{gtxt.register}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/about">{txt.about}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <LangSelector />
          <Nav.Link href="/login">{gtxt.login}</Nav.Link>
          <Nav.Link href="/register">{gtxt.register}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BasicNavBar;
