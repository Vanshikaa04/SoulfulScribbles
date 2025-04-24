import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Form, Row, Col, Modal,Container } from "react-bootstrap";
import { Package, LogOut, BookOpen } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../components/Title";

const UserProfile = () => {
  const { user, backendurl, token, setToken, setUser } =useContext(ShopContext);
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  // const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (token && user?.userid) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        contact: user.phone?.toString() || "",
     
      }));
    }
  }, [token, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post(
        backendurl + "/api/user/updateuser",
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success("User Info Updated");
        // setEditMode(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error(error.message); 
    }
  };

  const handlelogout=async()=>{
    setToken(''); 
    setUser('');
    navigate("/")
    toast.success("You logged Out!") 
  }
  return (
    <Container className="my-5">
    <Row className="justify-content-center">
      <Col xs={12} lg={10} xl={8}>
        <Card className="p-4 shadow rounded-4 bg-white">
          <div className="col-12">
            <Title text1="Your" text2="Profile" />
  
            <Form className="p-3 bg-light rounded shadow-sm">
              <Row>
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
  
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </Form.Group>
              </Row>
  
              <Row>
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
  
        
              </Row>
  
              
  
              <div className="d-flex justify-content-between">
                <Button variant="success" onClick={handleSaveEdit}>Save</Button>
              </div>
            </Form>
          </div>
  
          <Row className="my-3">
            <Col>
              <Link to="/orders" className="btn btn-outline-dark w-100">
                <Package className="me-2" size={18} /> View Orders
              </Link>
            </Col>
            <Col>
              <Link to="/workshops" className="btn btn-outline-dark w-100">
                <BookOpen className="me-2" size={18} /> Workshops
              </Link>
            </Col>
          </Row>
  
          <Button variant="danger" className="w-100" onClick={() => setShowModal(true)}>
            <LogOut className="me-2" size={18} /> Logout
          </Button>
        </Card>
      </Col>
    </Row>
  
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logging Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to Logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        <Button variant="danger" onClick={handlelogout}>Logout</Button>
      </Modal.Footer>
    </Modal>
  </Container>
  
);
};


export default UserProfile;
