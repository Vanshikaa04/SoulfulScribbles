import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import { FaPlus, FaList, FaUser } from "react-icons/fa";

const Layout = ({ setToken }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dashboardItems = [
    { icon: <FaPlus />, text: "Add Product", path: "/add" },
    { icon: <FaPlus />, text: "Add Workshop", path: "/addworkshop" },
    { icon: <FaList />, text: "List Workshops", path: "/listworkshops" },
    { icon: <FaUser />, text: "Workshop Registrations", path: "/registered" },
  ];

  const isHome = location.pathname === "/" || location.pathname === "/home";

  const [marginLeft, setMarginLeft] = useState(window.innerWidth >= 768 ? "250px" : "0px");

  useEffect(() => {
    const handleResize = () => setMarginLeft(window.innerWidth >= 768 ? "250px" : "0px");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container  className="p-0 " >
      <AdminNavbar setToken={setToken} handleShow={() => setShowSidebar(true)} />
      <Sidebar show={showSidebar} handleClose={() => setShowSidebar(false)} />

      <div
        className="p-3"
        style={{
          marginLeft: marginLeft,
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* <div className="mt-3 mt-md-0 d-flex flex-column align-items-center align-items-md-stretch"> */}
        <Container style={{marginTop: window.innerWidth >= 768 ? "-200px" : "0px",
        }}>
          {isHome ? (
            <Row className="g-4 justify-content-center text-center mb-5">
              {dashboardItems.map((item, index) => (
                <Col key={index} xs={12} sm={6} md={6} lg={6}>
                  <Card
                    className="p-4 shadow-sm text-center mb-4"
                    onClick={() => navigate(item.path)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <div
                        className="rounded-circle text-white d-flex justify-content-center align-items-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#f06595",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="fw-bold fs-6">{item.text}</div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Outlet />
          )}
        </Container>
        </div>
      {/* </div> */}
    </Container>
    
  );
};

export default Layout;
