import { Row, Col,Container } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
import { useState, useContext, useEffect } from "react";
import "./css_folder/latest.css"


const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestSell, setBestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const bestProduct = products.filter((item) => item?.bestseller === true);
      setBestProducts(bestProduct);
    } else {
      console.warn("Products list is empty or not an array");
    }
  }, [products]);

  return (
    <>
    <Container className="latest-collection-wrapper">

      <Title text1={"Best"} text2={"Seller"} />
      <div className="latest-collection-wrapper">
        <Row  className="gx-2 gy-4">
          {bestSell.length > 0 ? (
            bestSell.map((item, index) => (
              <Col key={index} xs={6} md={4} lg={3}>
                <ProductItem id={item._id} image={item.image} name={item.name} />
              </Col>
            ))
          ) : (
            <p className="text-center w-100">No Bestsellers Found</p> 
          )}
        </Row>
      </div>
          </Container>
      
    </>
  );
};

export default Bestseller;
