import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Row, Col, Modal } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl, currency } from '../App';
import Title from '../components/Title';
import { FaPen, FaTrash } from "react-icons/fa";

const ProductList = ({ token }) => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendurl + "/api/product/list", { headers: { token } });
      if (response.data.success) {
        setList(response.data.products);
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

  const removeProduct = async () => {
    try {
      const response = await axios.post(backendurl + "/api/product/remove", { id: deleteId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Product Deleted");
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

  const handleEdit = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post(backendurl + "/api/product/update", editData, { headers: { token } });
      if (response.data.success) {
        toast.success("Product Updated");
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

  useEffect(() => {
    fetchlist();
  },[]);

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center py-5 px-1">
    <Card className="shadow maincard w-100" style={{ maxWidth: "780px" }}>
      <Title text1={"Products"} text2={"List"} />
  
      {/* Table Header - only on medium and up */}
      <Row className="fw-bold text-center py-3 mb-3 d-none d-md-flex"
        style={{ backgroundColor: "rgba(244, 102, 152, 0.2)", color: "rgba(99, 8, 8, 0.9)", fontSize: "1rem" }}>
        <Col md={2}>Image</Col>
        <Col md={2}>Name</Col>
        <Col md={2}>Category</Col>
        <Col md={2}>SubCategory</Col>
        <Col md={2}>Price</Col>
        <Col md={1}>Delete</Col>
        <Col md={1}>Edit</Col>
      </Row>
  
      {/* Product Items */}
      {list.map((item, index) => (
        <div key={index}>
          {/* Desktop View */}
          <Row className="text-center align-items-center py-2 border-bottom d-none d-md-flex" style={{ fontSize: "0.95rem" }}>
            <Col md={2} className="d-flex justify-content-center">
              <img src={item.image} alt={item.name} className="img-fluid" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
            </Col>
            <Col md={2}>{item.name}</Col>
            <Col md={2}>{item.category}</Col>
            <Col md={2}>{item.subcategory}</Col>
            <Col md={2}>{currency} {item.price}</Col>
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
  
          {/* Mobile View */}
          <Card className="d-block d-md-none mb-3 p-3 border-0 shadow-sm" style={{ fontSize: "0.95rem" }}>
            <Row className="align-items-center mb-2">
              <Col xs={4}><strong>Image:</strong></Col>
              <Col xs={8}>
                <img src={item.image} alt={item.name} className="img-fluid" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
              </Col>
            </Row>
            <Row><Col><strong>Name:</strong> {item.name}</Col></Row>
            <Row><Col><strong>Category:</strong> {item.category}</Col></Row>
            <Row><Col><strong>SubCategory:</strong> {item.subcategory}</Col></Row>
            <Row><Col><strong>Price:</strong> {currency} {item.price}</Col></Row>
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
        </div>
      ))}
    </Card>
  
    {/* Edit Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label className='fw-bold'>Name</Form.Label>
            <Form.Control type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label className='fw-bold'>Category</Form.Label>
            <Form.Control type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label className='fw-bold'>SubCategory</Form.Label>
            <Form.Control type="text" value={editData.subcategory} onChange={(e) => setEditData({ ...editData, subcategory: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label className='fw-bold'>Price</Form.Label>
            <Form.Control type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
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
      <Button variant="danger" onClick={removeProduct}>Delete</Button>
    </Modal.Footer>
  </Modal>
</Container>
  );
};

export default ProductList;
