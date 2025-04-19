import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";  // Assuming Title is imported correctly
import { Row, Col } from "react-bootstrap";
import ProductItem from "../components/ProductItem";  // Assuming ProductItem is imported

const CategoryProducts = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);  // Filtered products
  const location = useLocation();
  const { value } = location.state || {};  // Category name passed via location.state

  // Function to apply filter based on category or show all products
  const applyFilter = useCallback(() => {
    let productCopy = products.slice(); // Shallow copy of products

    if (value) {
      // If a category name is provided, filter products based on the category
      productCopy = productCopy.filter((item) =>
        item.category?.toLowerCase() === value.toLowerCase()
      );
    }

    setFilterProducts(productCopy);
  }, [value ,products]);

  useEffect(() => {
    applyFilter()
  },[applyFilter]);

  // useEffect(() => {
  //   // When products change, apply the filter again
  //   setFilterProducts(products);
  // }, [products]);

  console.log(filterProducts)
  return (
    <>
      {/* Product Display */}
      <div className="w-100 justify-content-centre" >
        {/* Display title only if name is present */}
        <Title text1={value|| "All"} text2={"Products"} className="m-0" />

        {filterProducts.length > 0 ? (
          // If name is provided, only display the category name that matches filterProducts
          <Row className="justify-content-centre">
            {filterProducts.map((item, index) => (
              <Col key={index} xs={6} md={4} lg={3}>
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
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
