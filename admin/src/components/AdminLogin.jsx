import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from 'axios';
import { backendurl } from "../App";
import { toast } from "react-toastify";

const AdminLogin = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit =async (e) => {
    try {
    e.preventDefault();
    console.log(email +" "+ password)
      const response = await axios.post(backendurl+ '/api/user/admin', {email,password})
      
      if(response.data.success)
      {
        setToken(response.data.token)
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast(error)
    }

  
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: "400px" }} className="shadow p-4">
        <h3 className="text-center">Admin Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          
          <Button  type="submit" className="w-100" style={{ backgroundColor: "#f06595" , border:"none"}}>Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminLogin;
