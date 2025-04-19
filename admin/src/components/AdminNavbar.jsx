import React from 'react'
import { Navbar, Container, Button } from "react-bootstrap";
import "../components/css/navbar.css"
const AdminNavbar = ({setToken}) => {
  return (
    <>
       <Navbar bg="light"  expand="lg" className="p-3" sticky='top'>
      <Container>
        {/* Brand Title with Gradient */}
        <Navbar.Brand className="text-gradient">
          SOULFUL SCRIBBLES
          <div className="admin-text">Admin Panel</div>
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Right Side: Logout Button */}
        <Navbar.Collapse className="justify-content-end">
          <Button  onClick={()=>setToken('')} variant="danger" className="fw-bold" style={{backgroundColor:"red"}}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default AdminNavbar
