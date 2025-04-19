import {Row,Col,Container} from "react-bootstrap";
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem";
import Title from "./Title"
import { useState,useContext } from "react";
import { useEffect } from "react";
import "./css_folder/latest.css"

const Customizable = () => {
    const {products}= useContext(ShopContext)
    const [customizableproduct, setCustomProducts] =useState([]);
    // console.log("Products array:", products); 
           
  useEffect(()=>{
    if (!products || !Array.isArray(products)) {
      console.warn("Products list is undefined or not an array");
      return; // Prevents running filter on undefined
    }
    else{
    const bestProduct= products.filter((item)=>(item?.customizable === true))
     setCustomProducts(bestProduct.slice())
    // console.log(" Best Products array:", bestProduct); 
     
    }   
        },[products])
  return (
    <>
        <Container className="latest-collection-wrapper">
    
    <Title text1={"Customizable"} text2={"Product"}/> 
    <div className="latest-collection-wrapper">
    <Row  className="gx-2 gy-4">
             { customizableproduct.map((item ,index) => (
             <Col  key={index} xs={6} sm={6} md={4} lg={3}>
            <ProductItem   id={item._id} image={item.image} name={item.name}/>
            </Col>
       ))}
      
      </Row>    
    </div> 
    </Container>
    
    </>
  )
}


export default Customizable
