import { useState } from "react";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import proptype from "prop-types";


const Sidebar = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isCustomizable, setIsCustomizable] = useState(false);

  // Handle filter changes
  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      price: priceRange,
      customizable: isCustomizable,
    });
  };

  return (
    <div className="p-3 border rounded bg-light position-fixed mt-0"  >
      <h5 className="mb-3">Filters</h5>

      {/* Filter by Category */}
      <ListGroup className="mb-3">
        <ListGroup.Item className="fw-bold">Filter by Category </ListGroup.Item>
        {categories.map((cat, index) => (
          <ListGroup.Item key={index}>
            <Form.Check
              type="radio"
              name="category"
              label={cat}
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Filter by Price */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Filter by Price</Form.Label>
        <InputGroup>
          <Form.Select
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceRange}
          >
            <option value="">Select Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>

      {/* Filter by Customizable */}
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Show Only Customizable Products"
          checked={isCustomizable}
          onChange={() => setIsCustomizable(!isCustomizable)}
        />
      </Form.Group>

      {/* Apply Filters Button */}
      <Button variant="primary" onClick={handleFilterChange} className="w-100">
        Apply Filters
      </Button>
    </div>
  );
};

Sidebar.propTypes = {
  categories: proptype.arrayOf(proptype.string).isRequired,
  onFilterChange: proptype.func.isRequired,
};
export default Sidebar;
