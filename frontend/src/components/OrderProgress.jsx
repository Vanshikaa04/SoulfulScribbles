import { FaBox, FaMapMarkerAlt, FaTruck, FaHome } from "react-icons/fa";
import { ProgressBar } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
// import { useOrderProgress } from "./OrderProgressContext"; // Import Context

const OrderProgress = () => {
  const { currentStep } = ShopContext(); // Get Progress from Context

  const steps = [
    { label: "Ordered", icon: <FaBox /> },
    { label: "Address", icon: <FaMapMarkerAlt /> },
    { label: "Shipment", icon: <FaTruck /> },
    { label: "Delivered", icon: <FaHome /> },
  ];

  const stepPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="container my-4">
      <h4 className="mb-4 text-primary text-center">Order Progress</h4>

      {/* Progress Bar */}
      <ProgressBar now={stepPercentage} className="mb-4" variant="success" style={{ height: "10px" }} />

      {/* Steps with Icons */}
      <div className="d-flex justify-content-between align-items-center">
        {steps.map((step, index) => (
          <div key={index} className={`text-center ${currentStep >= index + 1 ? "text-success fw-bold" : "text-secondary"}`}>
            <div
              className={`rounded-circle border d-flex align-items-center justify-content-center ${
                currentStep >= index + 1 ? "bg-success text-white" : "bg-light"
              }`}
              style={{ width: "50px", height: "50px", fontSize: "1.5rem", margin: "0 auto" }}
            >
              {step.icon}
            </div>
            <p className="mt-2">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
