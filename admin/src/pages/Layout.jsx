import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Outlet} from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import { FaPlus, FaList,FaUser } from "react-icons/fa";
import { useNavigate} from  "react-router-dom";

const Layout = ({setToken}) => {
  const navigate = useNavigate();

  const dashboardItems = [
    { icon: <FaPlus />, text: "Add Product", path: "/add" },
    { icon: <FaPlus />, text: "Add Workshop", path: "/addworkshop" },
    { icon: <FaList />, text: "List Workshops", path: "/listworkshops" },
    { icon: <FaUser />, text: "Workshop Registrations", path: "/registered" },
  ];
  return (
    <Container fluid className="p-0 ">
    <AdminNavbar setToken={setToken} />
    <Row className="m-0">
      <Col xs="auto" className="p-0">
        <Sidebar />
      </Col>
     
      <Col className="p-4 my-5 justify-content-center ">
        <Container className="d-flex flex-column  p-2  align-items-center">
        {location.pathname === "/" || location.pathname === "/home" ?
        <>
          <Row className="g-3">
{dashboardItems.map((item, index) => (
  <Col key={index} xs={12} sm={6} md={6}>
    <Card
      className="p-4 shadow-sm d-flex align-items-center  text-center dashboard-card w-100 "
      onClick={() => navigate(item.path)}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center w-100">
        <div className="d-flex justify-content-center align-items-center rounded-circle text-white" style={{ width: "50px", height: "50px", backgroundColor: "#f06595" }}>
          {item.icon}
        </div>
        <div className="ms-3 fw-bold fs-7">{item.text}</div>
      </div>
    </Card>
  </Col>

))}
</Row>
</>
        :
       <Outlet />
        }
        </Container>

      </Col>
    </Row>
  </Container>
  );
};

export default Layout;
