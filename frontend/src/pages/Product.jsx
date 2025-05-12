import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Button, Badge, Container, Row, Col } from "react-bootstrap";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import RelatedProduct from "../components/RelatedProduct";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import ReviewsBox from "../components/ReviewsBox";
import { toast } from "react-toastify";

const Product = () => {
  const { productID } = useParams();
  const { products, addtocart, currency, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [description, setdescription] = useState("");
  const navigate = useNavigate();

  const cartvalid = () => {
    if (!token || token.length === 0) {
      navigate("/login");
      toast.error("Please Login Before!");
    } else {
      if (!selectedSize || !selectedShape) {
        toast.error("Please Select Shape/Size");
        return;
      }

      addtocart(productData._id, selectedSize, selectedShape, description);
      toast.success("Product Added to Cart Successfully");
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) return;
    const foundProduct = products.find((item) => item._id === productID);
    if (foundProduct) {
      setProductData(foundProduct);
    } else {
      console.warn("Product not found for ID:", productID);
    }
  }, [productID, products]);

  if (!productData) {
    return <p>Loading product...</p>;
  }

  return (
    <>
      <Link to="/collection">
        <button className="p-3 mx-5">
          <IoArrowBackCircle className="fs-1 position-relative top-0" />
        </button>
      </Link>

      <Container className="my-4">
        <Row className="align-items-center">
          <Col xs={12} lg={6} className="mb-4">
            <Image
              className="shadow w-100"
              src={productData.image}
              alt="Product"
              style={{ maxHeight: "60vh", objectFit: "cover" }}
            />
          </Col>

          <Col xs={12} lg={6}>
            {productData.bestseller && (
              <Badge bg="success" className="mb-2">
                Bestseller
              </Badge>
            )}

            <h1 style={{ color: "var(--maincolor)" }} className="my-3">
              {productData.name}
            </h1>
            <h5 className="text-muted">
              {productData.category} - {productData.subcategory}
            </h5>
            <h3 className="text-danger">
              {currency} {productData.price}
            </h3>
            <p className="fs-5">{productData.description}</p>

            <div className="d-flex align-items-center mb-3">
              {[...Array(5)].map((_, i) =>
                i < 4 ? (
                  <FaStar key={`star-${i}`} color="gold" size={20} />
                ) : (
                  <FaRegStar key={`star-${i}`} color="grey" size={20} />
                )
              )}
            </div>

            <h5>Select Shape:</h5>
            <div className="d-flex flex-wrap mb-2">
              <Button
                variant={selectedShape === "Default" ? "success" : "outline-secondary"}
                className="me-2 mb-2"
                onClick={() => setSelectedShape("Default")}
              >
                Default
              </Button>
              {Array.isArray(productData.shapes) && productData.shapes.length > 0 ? (
                productData.shapes.map((shape) => (
                  <Button
                    key={shape}
                    variant={selectedShape === shape ? "success" : "outline-secondary"}
                    className="me-2 mb-2"
                    onClick={() => setSelectedShape(shape)}
                  >
                    {shape}
                  </Button>
                ))
              ) : (
                <p>No shapes available</p>
              )}
            </div>

            <h5>Select Size:</h5>
            <div className="d-flex flex-wrap mb-2">
              <Button
                variant={selectedSize === "Default" ? "success" : "outline-secondary"}
                className="me-2 mb-2"
                onClick={() => setSelectedSize("Default")}
              >
                Default
              </Button>
              {Array.isArray(productData.sizes) && productData.sizes.length > 0 ? (
                productData.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "success" : "outline-secondary"}
                    className="me-2 mb-2"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>

            {productData.customizable && (
              <div className="my-4 d-flex flex-column">
                <h5>Add Your Desired Customizations:</h5>
                <input
                  type="text"
                  placeholder="Enter Description"
                  style={{ padding: "1rem", borderRadius: "10px" }}
                  className="border w-100"
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
            )}

            <Button
              className="mt-4 w-100 text-white d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "var(--maincolor)", height: "7vh" }}
              onClick={() => cartvalid()}
            >
              <FaShoppingCart className="me-2 fs-5" />
              <span className="fs-5">Add to Cart</span>
            </Button>
          </Col>
        </Row>

        <Tabs defaultActiveKey="description" id="desc" className="mt-5">
          <Tab
            eventKey="description"
            title="Description"
            className="p-3 w-100 fs-5"
          >
            Elevate your space with our beautifully handcrafted <b>{productData.name}</b>. Designed with
            premium-quality materials, this <b>{productData.category}</b> piece showcases exquisite
            craftsmanship and durability. Perfect for adding a touch of elegance to any home or workspace,
            it features a unique design and intricate detailing. Whether for personal use or as a thoughtful gift,
            this <b>{productData.subcategory}</b> is sure to impress. Available in multiple sizes and shapes,
            it’s a must-have for art lovers and décor enthusiasts alike!
          </Tab>
          {/* <Tab eventKey="reviews" title="Reviews (2)">
            <ReviewsBox />
          </Tab> */}
        </Tabs>


      <div className="d-flex justify-content-center flex-wrap my-4" >
        <RelatedProduct subcategory={productData.subcategory}   />
      </div>

      </Container>
    </>
  );
};

export default Product;