import React, { useState, useEffect } from 'react';
import { backendurl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { Container, Row, Col, Form, Card, Button, ButtonGroup, Modal } from 'react-bootstrap';
import "../components/css/orders.css"

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Ordered");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendurl}/api/order/list`, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = (order, status) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setShowModal(true);
  };

  const confirmStatusUpdate = async () => {
    if (!selectedOrder) return;
    try {
      const response = await axios.post(
        `${backendurl}/api/order/orderstatus`,
        { orderId: selectedOrder._id, newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated!");
        setShowModal(false);
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating status.");
    }
  };

  const groupedOrders = {
    Ordered: orders.filter(order => order.status === "Order Placed"),
    "Ready to Ship": orders.filter(order => order.status === "Ready to Ship"),
    Delivered: orders.filter(order => order.status === "Delivered"),
  };

  const statusTabs = ["Ordered", "Ready to Ship", "Delivered"];

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center py-5 px-1">
    <Card className="shadow maincard w-100" style={{ maxWidth: "780px" }}>
        <Title text1="All" text2="Orders" />

        <div className="d-flex justify-content-center mb-4">
          <ButtonGroup>
            {statusTabs.map((tab) => (
             <Button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-4 mx-1 mb-2 fw-semibold border rounded-pill mobile-button 
               ${activeTab === tab ? "text-white border-secondary" : "text-dark bg-white border-secondary"}`}
             style={{
               backgroundColor: activeTab === tab ? "rgb(240, 101, 149)" : "transparent",
             }}
           >
             {tab}
           </Button>
           
            

            ))}
          </ButtonGroup>
        </div>

        {groupedOrders[activeTab].length === 0 ? (
          <p className="text-center text-muted">No {activeTab.toLowerCase()} orders found.</p>
        ) : (
          groupedOrders[activeTab].map((order, index) => (
            <Card key={index} className="mb-4 p-3 shadow-sm border">
              <Row className="align-items-start">
                <Col xs={12} md={3} className="mb-2 mb-md-0">
                  <h6 className="fw-bold">Items:</h6>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="mb-2 fw-semibold">
                      {item.name}
                      <br />
                      <span className="text-muted small">[{item.shape}, {item.size}]</span>
                    </p>
                  ))}
                </Col>

                <Col xs={6} md={2}>
                  <h6 className="fw-bold">Amount:</h6>
                  <p className="text-danger fw-semibold">{currency} {order.amount}</p>
                </Col>

                <Col xs={12} md={4}>
                  <h6 className="fw-bold">Customer Info:</h6>
                  <p className="mb-1"><strong>Name:</strong> {order.address.fullName}</p>
                  <p className="mb-1"><strong>Phone:</strong> {order.address.contact}</p>
                  <p className="mb-1"><strong>Email:</strong> {order.address.email}</p>
                  <p className="mb-1"><strong>Address:</strong> {order.address.address}, {order.address.city} - {order.address.pincode}</p>
                </Col>

                <Col xs={6} md={3} >
                  <Form.Select value={order.status} onChange={(e) => handleStatusChange(order, e.target.value)}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Ready to Ship">Ready to Ship</option>
                    <option value="Delivered">Delivered</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card>
          ))
        )}
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the order status to "{newStatus}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirmStatusUpdate}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminOrders;
