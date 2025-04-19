import { useContext, useEffect, useState } from 'react';
import {  Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import "../components/css_folder/workshoplist.css"

import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
const WorkshopsF = () => {
    const [list, setList] = useState([]);
    const {backendurl,currency} = useContext(ShopContext)
    const navigate = useNavigate()
    const fetchlist = async () => {
      try {
        const response = await axios.get(backendurl + "/api/workshop/listworkshop");
        if (response.data.success) {
          setList(response.data.workshops);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(hours, minutes);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Convert to AM/PM format
    });
  };
  
  const register= ({date})=>{
    const currentDate = new Date();

    if(currentDate> formatDate(date))
      toast.error("Workshop Completed! Cant apply Now")

    else
    navigate("/register")
  }
  useEffect(() => {
    fetchlist();
  },[]);

  return (
    <>
      <Container fluid className="d-flex flex-column justify-content-center align-items-center py-5 px-1">
      <Card className="shadow maincard p-4 w-100" style={{ maxWidth: "1100px" }}>
        <Title text1={"Workshops"} text2={"List"} />

        {/* Table Header */}
        <Row
  className="fw-bold text-center py-3 mb-3 align-items-center d-none d-md-flex"
  style={{
    backgroundColor: "var(--maincolor)",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "0.85rem",
  }}
>
  <Col md={1}>Image</Col>
  <Col md={2}>Title</Col>
  <Col md={1}>Mode</Col>
  <Col md={2}>Location</Col>
  <Col md={1}>Fees</Col>
  <Col md={2}>Date & Time</Col>
  <Col md={2}>Description</Col>

  <Col md={1} className="justify-content-md-center">Action</Col>
</Row>


{list.map((item, index) => (
  <div key={index}>
    {/* Desktop View - Table Row Style */}
    <Row className="text-center align-items-center py-2 border-bottom d-none d-md-flex my-2" style={{ fontSize: "0.85rem" }}>
      <Col md={1} className="d-flex justify-content-center">
        <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ width: "2.5rem", height: "2.5rem", objectFit: "cover" }} />
      </Col>
      <Col md={2}>{item.title}</Col>
      <Col md={1}>{item.mode}</Col>
      <Col md={2}>{item.location}</Col>
      <Col md={1}>{currency} {item.fees}</Col>
      <Col md={2}>
        <div>{formatDate(item.date)}</div>
        <div>{formatTime(item.starttime)}</div>
      </Col>
  <Col md={2}>{item.description}</Col>

      <Col md={1}>
        <Button variant="danger" size="sm" onClick={() => register(item)}>Apply</Button>
      </Col>
    </Row>

    {/* Mobile View - Card Style */}
    <Card className="mb-3 d-block d-md-none px-2 py-2" style={{ fontSize: "0.8rem" }}>
      <Card.Body className="p-2">
        <div><strong>Title:</strong> {item.title}</div>
        <div><strong>Mode:</strong> {item.mode}</div>
        <div><strong>Location:</strong> {item.location}</div>
        <div><strong>Fees:</strong> {currency} {item.fees}</div>
        <div><strong>Date:</strong> {formatDate(item.date)}</div>
        <div><strong>Time:</strong> {formatTime(item.starttime)}</div>
      <div><strong>Description:</strong> {item.description}</div>

        <div className="text-center mt-2">
          <Button variant="danger" size="sm" onClick={() => register(item)}>Apply</Button>
        </div>
      </Card.Body>
    </Card>
  </div>
))}


          </Card>
          </Container>
        </>
  ) 
}

export default WorkshopsF

