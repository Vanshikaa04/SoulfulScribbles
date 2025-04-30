import { useContext, useState, useEffect, useCallback } from "react";
import Title from "../components/Title";
import { Col, Row, Button, Offcanvas } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { FaFilter } from "react-icons/fa";
import "../components/css_folder/collect.css";
import { useLocation, useNavigate } from "react-router-dom";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search") || "";

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const togglePrice = (e) => {
    if (price.includes(e.target.value)) {
      setPrice((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setPrice((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = useCallback(() => {
    let productCopy = products.slice();

    if (search) {
      productCopy = productCopy.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category?.toLowerCase())
      );
    }

    if (price.length > 0) {
      productCopy = productCopy.filter((item) => {
        if (!item || !item.price) return false;
        let itemPrice = parseFloat(item.price || "0");

        return price.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return max ? itemPrice >= min && itemPrice <= max : itemPrice >= min;
        });
      });
    }

    setFilterProducts(productCopy);
  }, [category, price, products, search]);

  const clearFilters = () => {
    setCategory([]);
    setPrice([]);
    setFilterProducts(products);
    navigate("/collection");
  };

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const renderFilters = () => (
    <>
      <h2>Filters</h2>
      <div className="p-3 my-2">
        <h5>Categories</h5>
        {["resin", "mandala", "wall", "glass", "decorations", "canvas", "candle"].map((cat) => (
          <div className="form-check" key={cat}>
            <input
              className="form-check-input"
              type="checkbox"
              value={cat}
              id={cat}
              checked={category.includes(cat)}
              onChange={toggleCategory}
            />
            <label className="form-check-label" htmlFor={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <div className="my-4 p-3">
        <h5>Price Range:</h5>
        {["1-200", "201-500", "501-1000", "1000+"].map((range) => (
          <div className="form-check" key={range}>
            <input
              className="form-check-input"
              type="checkbox"
              value={range}
              id={range}
              checked={price.includes(range)}
              onChange={togglePrice}
            />
            <label className="form-check-label" htmlFor={range}>
              {range === "1000+" ? "₹1000 and above" : `₹${range}`}
            </label>
          </div>
        ))}
      </div>

      <Button
        onClick={clearFilters}
        className="mb-3 mx-2"
        style={{ backgroundColor: "var(--maincolor)", color: "#fff" }}
      >
        Clear Filters
      </Button>
    </>
  );

  return (
    <>
      <Button
        className="d-md-none position-fixed top-7 start-0 m-2 z-3"
        onClick={() => setShowFilters(true)}
        style={{ zIndex: 999, backgroundColor: "var(--maincolor)" }}
      >
        <FaFilter />
      </Button>

      {/* Filters for Desktop View */}
      <div
        className="d-none d-md-block bg-light p-3 shadow"
        style={{
          position: "fixed",
          top: 170,
          bottom: 0,
          width: "15rem",
          overflowY: "auto",
        }}
      >
        {renderFilters()}
      </div>

      {/* Offcanvas Filters for Mobile */}
      <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start">
        <Offcanvas.Header closeButton style={{marginTop:"5rem"}}>
        </Offcanvas.Header>
        <Offcanvas.Body>{renderFilters()}</Offcanvas.Body>
      </Offcanvas>

      {/* Product Display */}
      <div className="product-display-container" style={{ marginLeft: "15rem" }}>
        <Title text1={"ALL"} text2={"Collections"} className="m-0" />

        {filterProducts.length > 0 ? (
          ["resin", "mandala", "wall", "glass", "decorations", "canvas", "candle"]
            .filter((cat) =>
              filterProducts.some((item) => item.category?.toLowerCase() === cat.toLowerCase())
            )
            .map((cat) => (
              <div key={cat} className="my-4">
                <h3 className="text-uppercase mx-3 p-2">{cat}</h3>
                <Row className="gx-3 gy-4 justify-content-center">
                  {filterProducts
                    .filter((item) => item.category?.toLowerCase() === cat.toLowerCase())
                    .map((item, index) => (
                      <Col key={index} xs={12} md={4} lg={3} className="product-col">
                        <ProductItem
                          id={item._id.toString()}
                          image={item.image}
                          name={item.name}
                          currency="₹"
                          price={item.price}
                        />
                      </Col>
                    ))}
                </Row>
              </div>
            ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default Collection;
