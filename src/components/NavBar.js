import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = ({ name, setName }) => {
  const logout = async () => {
    await fetch(`${process.env.REACT_APP_API_END_POINT}/api/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setName("");
  };

  let menu;

  console.log(name);
  if (name === "" || name === undefined) {
    menu = (
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    );
  } else {
    menu = (
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/map">Map</Nav.Link>
        <Nav.Link href="/login" onClick={logout}>
          Logout
        </Nav.Link>
      </Nav>
    );
  }
  return (
    <div>
      <Navbar bg="primary" variant="light" expand="lg">
        <Container>
          <Navbar.Brand > AWM CA2</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {menu}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
