import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./css/navbar.css"

const AdminNavbar = ({ setToken, handleShow }) => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="p-3 shadow-sm w-100">
      <Container fluid>
        <Button variant="outline-secondary" className="d-md-none me-3" onClick={handleShow}>
          <FaBars />
        </Button>

        <Navbar.Brand className="text-gradient">
          SOULFUL SCRIBBLES
          <div className="admin-text">Admin Panel</div>
        </Navbar.Brand>

        <Button onClick={() => setToken("")} variant="danger" className="fw-bold">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
