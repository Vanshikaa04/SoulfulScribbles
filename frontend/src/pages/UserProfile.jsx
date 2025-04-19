import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { Package, Pencil, LogOut, BookOpen } from "lucide-react";
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
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (token && user?.userid) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone?.toString() || "",
        password: user.password || "",
        address: user.address || "null",
        city: user.city || "null",
        state: user.state || "null",
        pincode: user.pincode || "null",
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
    <>     
    <Card className="p-4 m-4 shadow rounded-4" style={{ maxWidth: '800px', margin: 'auto' }}>

    {/* {editMode ? ( */}
      <div className="col-lg-12">
      <Title text1="Your" text2="Profile" />

        {/* <Title text1="Confirm" text2="Details" /> */}
        <Form className="p-3 bg-light rounded shadow">
          <div className="row">
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
          </div>

          <div className="row">
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

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                required
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="success" onClick={handleSaveEdit}>Save</Button>
            {/* <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button> */}
          </div>
        </Form>
      </div>
    {/* ) : (
      <div>
        <p><strong>Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.contact}</p>
        <p><strong>Address:</strong> {formData.address || 'null'}</p>
        <Button variant="outline-primary" className="my-3" onClick={() => setEditMode(true)}>
          <Pencil className="me-2" size={18} /> Edit
        </Button>
      </div> */}
    {/* )} */}

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

  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Logging Out</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to Logout?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
      <Button variant="danger" onClick={() => { handlelogout()}}>Logout</Button>
    </Modal.Footer>
  </Modal>
</>
);
};


export default UserProfile;
