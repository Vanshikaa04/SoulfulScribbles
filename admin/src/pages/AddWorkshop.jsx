import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col ,Modal} from "react-bootstrap";
import "../components/css/add.css"
import axios from 'axios';
import { backendurl } from "../App";
import Title from "../../../frontend/src/components/Title"
import { toast } from "react-toastify";

const AddWorkshop = ({token}) => {
    const [itemData, setItemData] = useState({
      image: "",
      name: "",
      description: "",
      fees: "",
     mode:"",
     date : "",
    starttime:"",
    endtime:"",
    location : "",
    });
  
  
  
    const handleChange = (e) => {
      const { name, value, type, checked ,files} = e.target;
  
      if (type === "file") {
        const file = files[0];
        if (file) {
        
          setItemData((prev) => ({ ...prev, image: file })); // Store  file
        }
      } else if (type === "checkbox") {
        setItemData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        } 
      ));
    }
       else {
        setItemData((prev) => ({ ...prev, [name]: value }));
      }
    
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("image", itemData.image); // Append image
      formData.append("title", itemData.title);
      formData.append("description", itemData.description);
      formData.append("fees", itemData.fees);
      formData.append("location", itemData.location);
      formData.append("mode", itemData.mode);
      formData.append("date", itemData.date);
      formData.append("starttime", itemData.starttime);
      formData.append("endtime", itemData.endtime);
   
    
      try {
        const response = await axios.post(backendurl+ "/api/workshop/addworkshop", formData, {
          headers: { token },
        });
        console.log("Workshop added successfully:", response.data);
        toast.success("Workshop Added Successfully");
      } catch (error) {
        console.error("Error uploading workshop:", error.response?.data || error.message);
      }
    };
  
  
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center ">
  
        <Card style={{ width: "780px" ,}} className=" shadow maincard">
        <Title text1={"Add"} text2={"Workshop"}/>
  
          <Form onSubmit={handleSubmit} className="p-4">
            <Row className="mb-3">
             
              <Col>
                <Form.Group>
                  <Form.Label className="formlabel">Title</Form.Label>
                  <Form.Control type="text" name="title" onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="formlabel">Image</Form.Label>
                  <Form.Control type="file" name="image"  accept="image/*" onChange={handleChange} />
                
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
             
              <Col>
                <Form.Group>
                  <Form.Label className="formlabel">Date</Form.Label>
                  <Form.Control type="date" name="date" onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="formlabel">Location</Form.Label>
                  <Form.Control type="text" name="location" onChange={handleChange} placeholder="null" required />
                </Form.Group>
              </Col>
              
            </Row>
  
  <Row className="mb-3">
            <Col>
                <Form.Group>
                  <Form.Label className="formlabel">Start Time</Form.Label>
                  <Form.Control type="time" name="starttime"   onChange={handleChange} />
               </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="formlabel">End Time</Form.Label>
                  <Form.Control type="time" name="endtime"   onChange={handleChange} />
               </Form.Group>
              </Col>

              </Row>
  
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="formlabel">Workshop Fees</Form.Label>
                  <Form.Control type="number" name="fees" onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col >
              <Form.Label className="formlabel">Mode</Form.Label>
            <Row>
              {['Remote', 'Offline'].map((modes) => (
                                <Col  key={modes}>
                               <Form.Check
                                 type="checkbox"
                                 label={modes}
                                name="mode"
                                 value={modes}
                                 onChange={handleChange}
                               />
                               </Col>
                              ))}
                             </Row>

                             </Col>

            </Row>
  
    
            <Form.Group className="mb-3">
              <Form.Label className="formlabel">Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} />
            </Form.Group>
  
            <Button type="submit"  className="w-50  addbtn  fs-4" style={{backgroundColor:" #f06595"}}>
              Add Item
            </Button>
          </Form>
        </Card>
  
         
  
      </Container>
    );
  };
  

export default AddWorkshop
