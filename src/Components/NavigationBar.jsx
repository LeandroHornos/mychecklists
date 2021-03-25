import React, { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LangSelector from "./LangSelector";

import { LanguageContext } from "../Lang";

const NavigationBar = () => {
  const { dictionary } = useContext(LanguageContext);
  const txt = dictionary.components.NavigationBar;
  const gtxt = dictionary.general;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        Checklist<span style={{ color: "red" }}>-</span>me
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/checklists">Checklists</Nav.Link>
          <Nav.Link href="/edit">{txt.new}</Nav.Link>
          <NavDropdown title={txt.explore} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/">
              {gtxt.home}
            </NavDropdown.Item>
            <NavDropdown.Item href="/edit">{txt.new}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/exit">
              {gtxt.signOut}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <LangSelector />
          <Nav.Link href="/exit">{gtxt.signOut}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
