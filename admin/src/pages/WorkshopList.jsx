import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Row, Col, Modal } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl, currency } from '../App';
import Title from '../../../frontend/src/components/Title';
import { FaPen, FaTrash } from "react-icons/fa";

const WorkshopList = ({token}) => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendurl + "/api/workshop/listworkshop", { headers: { token } });
      if (response.data.success) {
        setList(response.data.workshops);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const removeWorkshop = async () => {
    try {
      const response = await axios.post(backendurl + "/api/workshop/deleteworkshop", { id: deleteId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Workshop Deleted");
        setShowDeleteModal(false);
        await fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error(error.message);
    }
  };

  const handleEdit = (workshop) => {
    setEditData(workshop);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post(backendurl + "/api/workshop/updateworkshop", editData, { headers: { token } });
      if (response.data.success) {
        toast.success("Workshop Updated");
        setShowModal(false);
        await fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error(error.message);
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

  useEffect(() => {
    fetchlist();
  },[]);

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center py-5 px-1">
    <Card className="shadow maincard w-100" style={{ maxWidth: "780px" }}>
        <Title text1={"Workshops"} text2={"List"} />

        {/* Table Header */}
        
      <Row className="fw-bold text-center py-3 mb-3 d-none d-md-flex"style={{ backgroundColor: "rgba(244, 102, 152, 0.2)", color: "rgba(99, 8, 8, 0.9)", fontSize: "1rem" }}>
          <Col md={2}>Image</Col>
          <Col md={2}>Title</Col>
          <Col md={2}>Mode</Col>
          <Col md={2}>Location</Col>
          <Col md={2}>Fees</Col>
          <Col md={2}>Date</Col>
          <Col md={2}>Start Time</Col>

        </Row>

        {/* Product Items */}
        {list.map((item, index) => (
        <div key={index}>

          <Row className="text-center align-items-center py-2 border-bottom d-none d-md-flex" style={{ fontSize: "0.95rem" }}>
            <Col md={2} className="d-flex justify-content-center">
              <img src={item.image} alt={item.name} className="img-fluid" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
            </Col>
            <Col md={2}>{item.title}</Col>
            <Col md={2}>{item.mode}</Col>
            <Col md={2}>{item.location}</Col>
            <Col md={2}>{currency} {item.fees}</Col>
            <Col md={2}>{formatDate(item.date)} </Col>
            <Col md={2}>{formatTime(item.starttime)} </Col>

            <Col md={1}>
              <Button variant="danger" size="sm" onClick={() => confirmDelete(item._id)}>
                <FaTrash />
              </Button>
            </Col>
            <Col md={1}>
              <Button size="sm" onClick={() => handleEdit(item)} style={{ backgroundColor: "rgb(244, 102, 152)", border: "none" }}>
                <FaPen />
              </Button>
            </Col>
          </Row>

          <Row>
            
                    {/* Mobile View */}
                    <Card className="d-block d-md-none mb-3 p-3 border-0 shadow-sm" style={{ fontSize: "0.95rem" }}>
                      <Row className="align-items-center mb-4">
                      <Col xs={4}></Col>
                                    <Col xs={8}>
                                      <img src={item.image} alt={item.name} className="img-fluid" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                                    </Col>
                          </Row>
                                  <Row><Col><strong>Title:</strong> {item.title}</Col></Row>
                                  <Row><Col><strong>Mode:</strong> {item.mode}</Col></Row>
                                  <Row><Col><strong>Location:</strong> {item.location}</Col></Row>
                                  <Row><Col><strong>Fees:</strong> {currency} {item.fees}</Col></Row>
                                  <Row><Col><strong>Time:</strong> {item.starttime}-{item.endtime}</Col></Row>

                                  <Row className="mt-3 d-flex justify-content-between">
                                    <Col xs="auto">
                                      <Button variant="danger" size="sm" onClick={() => confirmDelete(item._id)}>
                                        <FaTrash />
                                      </Button>
                                    </Col>
                                    <Col xs="auto">
                                      <Button size="sm" onClick={() => handleEdit(item)} style={{ backgroundColor: "rgb(244, 102, 152)", border: "none" }}>
                                        <FaPen />
                                      </Button>
                                    </Col>
                                  </Row>
                                </Card>
                                </Row>
                              </div>
        ))}
      </Card>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className='fw-bold'>Title</Form.Label>
              <Form.Control type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label className='fw-bold'>Location</Form.Label>
              <Form.Control type="text" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
            </Form.Group>

            <Form.Group>
            <Form.Label className='fw-bold'>Mode</Form.Label>
              <Form.Control type="text" value={editData.mode} onChange={(e) => setEditData({ ...editData, mode: e.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label className='fw-bold'>Date</Form.Label>
              <Form.Control type="text" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
            </Form.Group>
            
            <Form.Group>
            <Form.Label className='fw-bold'>Start Time</Form.Label>
              <Form.Control type="text" value={editData.starttime} onChange={(e) => setEditData({ ...editData,starttime: e.target.value })} />
            </Form.Group>
            
            <Form.Group>
            <Form.Label className='fw-bold'>End Time</Form.Label>
              <Form.Control type="text" value={editData.endtime} onChange={(e) => setEditData({ ...editData, endtime: e.target.value })} />
            </Form.Group>
            
            <Form.Group>
              <Form.Label className='fw-bold'>Fees</Form.Label>
              <Form.Control type="number" value={editData.fees} onChange={(e) => setEditData({ ...editData,fees: e.target.value })} />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} style={{ backgroundColor: "rgb(248, 204, 220)", color: "rgba(99, 8, 8, 0.9)", border: "none" }}>Cancel</Button>
          <Button onClick={handleSaveEdit} style={{ backgroundColor: "rgb(244, 102, 152)", border: "none" }}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={removeWorkshop}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default WorkshopList
