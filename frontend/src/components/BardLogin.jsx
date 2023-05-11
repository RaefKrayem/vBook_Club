import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function BardLogin() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img src="logo.png" alt="Virtual Book Club" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/users">Clubs</Nav.Link>
          <Nav.Link href="#books">Books</Nav.Link>
          <Nav.Link href="#challenges">Challenges</Nav.Link>
        </Nav>
        <NavDropdown alignRight title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BardLogin;
