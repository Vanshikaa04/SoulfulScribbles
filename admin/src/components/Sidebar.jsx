import React from "react";
import { ListGroup, Container } from "react-bootstrap";
import { FaPlus, FaList, FaShoppingCart, FaHome } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./css/sidebar.css"
const Sidebar = () => {
  return (
    <Container fluid className="p-3 bg-white shadow-sm position-fixed  " style={{ width: "250px" , height:"100vh" }}>
      <ListGroup variant="flush" className="p-2">
      
            <NavLink to ="/" style={{textDecoration:"none" }} activeclassname="active" className="nav-link d-flex align-items-center gap-3 p-3 my-2">

          <FaHome /> Home
        </NavLink>

        <NavLink to ="/add" style={{textDecoration:"none" }} activeclassname="active" className="nav-link d-flex align-items-center gap-3 p-3 my-2">

<FaPlus /> Add Products
</NavLink>

        <NavLink to ="/list" style={{textDecoration:"none"}} activeclassname="active" className="nav-link d-flex align-items-center gap-3 p-3 my-2">
          <FaList /> List Products
        </NavLink>


        <NavLink to ="/orders" style={{textDecoration:"none"}} activeclassname="active" className="nav-link d-flex align-items-center gap-3 p-3 my-2">
          <FaShoppingCart /> Orders
        </NavLink>


        
      </ListGroup>
    </Container>
  );
};

export default Sidebar;
