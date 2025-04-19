import { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import "./css_folder/latest.css"

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latest, setLatestCollection] = useState([]);

  useEffect(() => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setLatestCollection(sortedProducts.slice(0, 10));
  }, [products]);

  return (
    <Container className="latest-collection-wrapper">
      <Title text1={"Latest"} text2={"Collection"} />
      <div className="latest-collection-wrapper">
  <Row className="gx-2 gy-4"> {/* gx = horizontal spacing, gy = vertical spacing */}
    {latest.map((item, index) => (
      <Col key={index} xs={6} sm={6} md={4} lg={3}>
        <ProductItem
          id={item._id}
          image={item.image}
          name={item.name}
        />
      </Col>
    ))}
  </Row>
</div>



    </Container>
  );
};

export default LatestCollection;
