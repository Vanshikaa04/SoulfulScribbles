import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
const RegisterForm = () => {

    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      workshop: "workshop1", // Default selected workshop
    });
  
    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data Submitted:", formData);
      alert("Registration Successful!");
    };
  
    return (
      <Container className="mt-4 p-4 border rounded shadow-lg bg-light" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Workshop Registration</h2>
        <Form onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          {/* Phone Number */}
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          {/* Workshop Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Select Workshop</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Workshop 1"
                name="workshop"
                value="workshop1"
                checked={formData.workshop === "workshop1"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Workshop 2"
                name="workshop"
                value="workshop2"
                checked={formData.workshop === "workshop2"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
  
          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Container>
    );
  }

export default RegisterForm
