import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Container, Button, ButtonGroup ,Modal} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendurl, token, user, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Ordered");
  const navigate = useNavigate();
  const userid = user?.userid;
  const [showCancelModal, setShowCancelModal] = useState(false);
const [selectedOrderId, setSelectedOrderId] = useState(null);


  const statusTabs = ["Ordered", "Ready to Ship", "Delivered"];

  const loadOrders = async () => {
    if (!token || !userid) {
      toast.error("You're not logged in");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${backendurl}/api/order/userorder`,
        { userid },
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.info(response.data.message || "No orders found");
      }
    } catch (error) {
      console.error("Order fetch error:", error);
      toast.error("Failed to load orders");
    }
  };

  const handleShowCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };
  
  const handleConfirmCancel = async () => {
    try {
      const response = await axios.post(
        `${backendurl}/api/order/cancel`,
        { orderid: selectedOrderId },
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        loadOrders();
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Failed to cancel order");
    } finally {
      setShowCancelModal(false);
      setSelectedOrderId(null);
    }
  };
  
  useEffect(() => {
    loadOrders();
  }, []);

  const groupedOrders = {
    Ordered: orders.filter((order) => order.status === "Order Placed"),
    "Ready to Ship": orders.filter((order) => order.status === "Ready to Ship"),
    Delivered: orders.filter((order) => order.status === "Delivered"),
  };

  const renderOrders = (ordersList) => {
    return ordersList.length === 0 ? (
      <p className="text-muted">No {activeTab.toLowerCase()} orders.</p>
    ) : (
      ordersList.map((order, orderIndex) => (
        <div key={orderIndex} className="mb-4">
          {order.items.map((item) => {
            const itemid = item.itemid || item._id;
            const size = item.size;
            const shape = item.shape;
            const quantity = item.quantity;
            const product = item; // assuming item has image, name, price

            return (
              <div
                key={`${itemid}-${size}-${shape}`}
                className="container border rounded p-3 my-3 shadow-sm"
              >
                <div className="row align-items-center">
                  {/* Product Image */}
                  <div className="col-4 col-md-2 text-center">
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="col-8 col-md-5">
                    <a
                      href={`/product/${itemid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h5
                        className="fw-bold"
                        style={{ color: "var(--maincolor)" }}
                      >
                        {product.name}
                      </h5>
                    </a>
                    <p className="mb-1">
                      <b>Size:</b> {size}
                    </p>
                    <p className="mb-1">
                      <b>Shape:</b> {shape}
                    </p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="col-12 col-md-3 text-md-center">
                    <p className="mb-1">
                      <b>Quantity:</b> {quantity}
                    </p>
                    <p className="mb-1 text-danger fw-bold">
                      {currency}
                      {product.price * quantity}
                    </p>
                  </div>

                    {/* Track Order */}
                  <div className="text-end mt-2 d-flex flex-row justify-content-center">
                    <Button
                      variant="danger"
                      className="me-2  px-3 py-1"
                      onClick={() => navigate(`/trackorder/${order._id}`)}
                    >
                      Track Order
                    </Button>

                       {/* Cancel Order */}
                  {order.status === "Order Placed" && (
                    
                    <Button
                      variant="danger"
                      className= " px-3 py-1"
                      onClick={() => handleShowCancelModal(order._id)}

                    >
                      Cancel Order
                    </Button>
                  )}
                  </div>

               

                </div>
              </div>
            );
          })}
        </div>
      ))
    );
  };

  return (
    <>
    <Container className="my-5">
      <Title text1="My" text2="Orders" />

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup>
          {statusTabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 mx-1 fw-semibold border rounded-pill ${
                activeTab === tab
                  ? "text-white border-secondary"
                  : "text-dark bg-white border-secondary"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab ? "rgb(32, 19, 70)" : "transparent",
              }}
            >
              {tab}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      {/* Render Orders */}
      {renderOrders(groupedOrders[activeTab])}
    </Container>


<Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Cancel Order</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
      No
    </Button>
    <Button variant="danger" onClick={handleConfirmCancel}>
      Yes, Cancel Order
    </Button>
  </Modal.Footer>
</Modal>
</>

  );
};

export default Orders;
