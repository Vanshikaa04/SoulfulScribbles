import {  useState ,useContext, useEffect} from "react";
import { Form, Button, Toast, ToastContainer, Image } from "react-bootstrap";
import Bill from "../components/Bill";
import Title from "../components/Title";
import razorpay from "../assets/razorpay-icon.png";
// import stripe from "../assets/stripe-icon.png";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

const PlaceOrder = () => {  
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });
  
  const { token, backendurl, cartitems, setcartitems, totalamount, shipmentfee, products, user } = useContext(ShopContext);
  const navigate = useNavigate();  
  const [showToast, setShowToast] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const initpay= (order)=>{
    const options={
      key:import .meta.env.VITE_RazorPay_ID,
      amount: order.amount,
      currency :order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt:order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const resp =await axios.post (backendurl +"/api/order/verifyrazor", response, {headers:{token}})
          if (resp.data.success) {
            setcartitems({});
            toast.success(resp.data.message);
            navigate("/orders");
          }
          
        } catch (e) {
          console.log(e);
          toast.error(e);
        }
        
    }
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
  }

    const passtoDB = async(orderItems)=>{
    let orderData ={
      userid:user.userid,
      address:formData,
      items: orderItems,
      amount :totalamount() +shipmentfee
    }
try{
    switch(paymentMethod)
    {
      case 'COD' :
        {
        const response =await axios.post(backendurl+"/api/order/place",orderData, {headers: {token}})

        if(response.data.success)
          {setcartitems({})
        navigate("/orders")
        toast.success(response.data.message);

          }

          else{
            toast.error(response.data.message);
          }
        break; 
        }
      case 'razorpay' :
        {
        const resrazorpay = await axios.post(backendurl+"/api/order/placerazor",orderData,{headers:{token}} ) 
          if (resrazorpay.data.success)
            initpay(resrazorpay.data.order)
          break;
        }
        default:
          break;
    }}
    catch(e){
      console.log(e);
      toast.error(e);
    }
  }
  const handleSubmit = () => {
    // e.preventDefault();
  
    // Simple validation
    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill in ${key}`);
        return;
      }
    }
  
    try {
      let orderItems = [];
  
      for (const itemId in cartitems) {
        for (const shape in cartitems[itemId]) {
          for (const size in cartitems[itemId][shape]) {
            if (cartitems[itemId][shape][size] > 0) {
              const product = products.find((p) => p._id === itemId);
              if (product) {
                const itemInfo = structuredClone(product);
                itemInfo.size = size;
                itemInfo.shape = shape;
                itemInfo.quantity = cartitems[itemId][shape][size];
                orderItems.push(itemInfo);
              }
            }
          }
        }
      }
//pass to DB
    passtoDB(orderItems)
      console.log("Order Items:", orderItems);
      console.log("Form :",formData);
  
  
      // Show toast
      setShowToast(true);
  
      // Clear form
      setFormData({
        fullName: "",
        contact: "",
        email: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
      });
  
    } catch (error) {
      console.log("Error in Place Order:", error);
    }
  };
  
  // Auto-fill formData from user context if available
  useEffect(() => {
    if (token && user?.userid) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        contact: user.phone?.toString() || "", // ensure phone is a string
      }));
    }
  }, [token, user]);
  
  
  return (

      <>
    <div className="container-fluid p-4 text-center">
      <div className="row ">
        {/* Left Section - Form */}
        <div className="col-lg-6 col-md-12  ">
          <Title text1="Confirm" text2="Details" />
          <Form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow">
            {/* Two Fields Per Row */}
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
          </Form>
        </div>

        {/* Right Section - Bill and Payment */}
        <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
          <Bill />
        </div>

        {/* Payment Method */}
        <div className="text-center justify-content-center align-items-center">
  <div className="p-3 bg-light rounded shadow mt-5 mx-auto" style={{ maxWidth: "100%", overflowX: "auto" }}>
    <h4 className="fw-bold text-dark text-center mb-5">Select Payment Method</h4>

    <Form
      className="d-flex flex-nowrap justify-content-center align-items-center gap-4"
      style={{ minWidth: "300px" }}
    >
      {/* Razorpay */}
      <div className="text-center">
        <Form.Check
          type="radio"
          id="razorpay"
          name="payment"
          value="razorpay"
          checked={paymentMethod === "razorpay"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mb-2"
          label={
            <Image
              src={razorpay}
              alt="RazorPay"
              className="img-fluid"
              style={{ maxWidth: "80px" }}
            />
          }
        />
      </div>

      {/* Stripe
      <div className="text-center">
        <Form.Check
          type="radio"
          id="stripe"
          name="payment"
          value="stripe"
          checked={paymentMethod === "stripe"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mb-2"
          label={
            <Image
              src={stripe}
              alt="Stripe"
              className="img-fluid"
              style={{ maxWidth: "60px" }}
            />
          }
        />
      </div> */}

      {/* COD */}
      <div className="text-center">
        <Form.Check
          type="radio"
          id="cod"
          name="payment"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mb-2"
          label="Cash on Delivery"
        />
      </div>
    </Form>
  </div>

  <Button
    type="submit"
    className="w-50 w-md-25 btn mt-5 fs-4"
    style={{ backgroundColor: "var(--maincolor)" }}
    onClick={handleSubmit}
  >
    Confirm & Pay
  </Button>
</div>


      </div>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Order Placed</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
    </>
    
              // }
  );
};

export default PlaceOrder;
