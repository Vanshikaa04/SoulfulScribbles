import React from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { FaPlus, FaList, FaShoppingCart, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./css/sidebar.css";

const Sidebar = ({ show, handleClose }) => {
  const links = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/add", icon: <FaPlus />, label: "Add Products" },
    { to: "/list", icon: <FaList />, label: "List Products" },
    { to: "/orders", icon: <FaShoppingCart />, label: "Orders" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-md-block bg-white shadow-sm position-fixed sidebar-desktop">
        <ListGroup variant="flush" className="p-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className="nav-link d-flex align-items-center gap-3 p-3 my-2"
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </ListGroup>
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} responsive="md">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className="nav-link d-flex align-items-center gap-3 p-3 my-2"
                onClick={handleClose}
              >
                {link.icon} {link.label}
              </NavLink>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
