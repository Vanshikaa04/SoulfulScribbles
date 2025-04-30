import { useContext, useEffect, useState } from "react";
import { MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import axios from "axios";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import "./css_folder/track.css";
import { FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";

const orderSteps = [
  { key: "order_placed", label: "Order Placed", icon: <FaBox /> },
  { key: "ready_to_ship", label: "Ready to Ship", icon: <GiCardboardBoxClosed /> },
  { key: "out_for_delivery", label: "Out for Delivery", icon: <FaTruck /> },
  { key: "delivered", label: "Delivered", icon: <FaCheckCircle /> },
];

const statusMapping = {
  "Order Placed": "order_placed",
  "Ready to Ship": "ready_to_ship",
  "Out for Delivery": "out_for_delivery",
  "Delivered": "delivered",
};


export default function TrackOrder() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backendurl } = useContext(ShopContext);

  useEffect(() => {
    axios
      .get(backendurl + "/api/order/status")
      .then((res) => {
        const statusLabel = res.data.status; // e.g., "Ready to Ship"
        setStatus(statusMapping[statusLabel]); // Set the corresponding key
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order status:", err);
        setLoading(false);
      });
  }, []);
  

  const getStepState = (stepKey) => {
    const currentIndex = orderSteps.findIndex((s) => s.key === status);
    const stepIndex = orderSteps.findIndex((s) => s.key === stepKey);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  const getComment = (stepKey) => {
    if (stepKey === "order_placed") return "Your order has been successfully placed.";
    if (stepKey === "ready_to_ship") return "Order will soon be ready to ship.";
    if (stepKey === "out_for_delivery") return "Your order is on the way!";
    if (stepKey === "delivered") return "Order has been delivered.";
    return "";
  };

  return (
    <MDBContainer className="py-5 d-flex flex-column align-items-center">
      <Title text1="Order" text2="Track" />
      {loading ? (
        <div className="text-center">
          <MDBSpinner grow color="primary" />
        </div>
      ) : (
        <ul className="timeline-with-icons">
          {orderSteps.map((step) => (
           <li className={`timeline-item mb-5 text-center ${getStepState(step.key)}`} key={step.key}>

              <span className="timeline-icon">
                {step.icon}
              </span>
              <h5 className={`fw-bold step-${getStepState(step.key)}`}>
  {step.label}
</h5>

              <p className="text-muted">
                {getComment(step.key)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </MDBContainer>
  );
}
