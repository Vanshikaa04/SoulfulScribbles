import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col ,Modal} from "react-bootstrap";
import "../components/css/add.css"
import axios from 'axios';
import { backendurl } from "../App";
import Title from "../../../frontend/src/components/Title"
import { toast } from "react-toastify";
const AddItem = ({token}) => {
  const [itemData, setItemData] = useState({
    image: "",
    name: "",
    category: "",
    subcategory: "",
    description: "",
    sizes: [],
    shapes: [],
    price: "",
    bestseller: "false",
    customizable: "false",
  });


  const [categories, setCategories] = useState({
    "Resin": ["Jewellery", "Keychains", "Clock"],
    "Candles": ["Candle"],
    "Mandala": ["Bookmarks","MandalaArt"],
    "Canvas": ["cartoon", "SpirtualPaintings"],
    "Glass": ["BottleDesigns"],
    "Decoration": ["aasan","Festive", "Karwachauth","WeddingBells"],
    "Wall": ["WallArt"],
    
  });
  const [categoryList, setCategoryList] = useState(Object.keys(categories));
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState("")

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
  }else if(type==="radio")
      {
        setItemData((prev) => ({
        ...prev,
        [name]: prev[name] === "true" ? "false" : "true"}));
      }
     else {
      setItemData((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "category") {
      setItemData((prev) => ({ ...prev, subcategory: "" })); // Reset subcategory when category changes
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    // formData.append("image", itemData.image); // Append image
    // formData.append("name", itemData.name);
    // formData.append("description", itemData.description);
    // formData.append("price", itemData.price);
    // formData.append("category", itemData.category);
    // formData.append("subcategory", itemData.subcategory);
    // formData.append("sizes", JSON.stringify(itemData.sizes)); // Convert arrays to JSON
    // formData.append("shapes", JSON.stringify(itemData.shapes));
    // formData.append("bestseller", itemData.bestseller);
    // formData.append("customizable", itemData.customizable);
    Object.keys(itemData).forEach((key) => {
      formData.append(key, key === "sizes" || key === "shapes" ? JSON.stringify(itemData[key]) : itemData[key]);
    });
  
    try {
      const response = await axios.post(backendurl+ "/api/product/add", formData, {
        headers: { token },
      });
      console.log("Item added successfully:", response.data);
      toast.success("Product Added Successfully");
    } catch (error) {
      console.error("Error uploading item:", error.response?.data || error.message);
    }
  };
  
  const addCategory = () => {
    if (newCategory && !categoryList.includes(newCategory)) {
      setCategories((prev) => ({ ...prev, [newCategory]: [] }));
      setCategoryList([...categoryList, newCategory]);
      setNewCategory("");
      setShowCategoryModal(false);
    }
  };

  // Add New Subcategory
  const addSubcategory = () => {
    if (newSubcategory && itemData.category) {
      setCategories((prev) => ({
        ...prev,
        [itemData.category]: [...prev[itemData.category], newSubcategory],
      }));
      setNewSubcategory("");
      setShowSubcategoryModal(false);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center ">

      <Card style={{ width: "780px" ,}} className=" shadow maincard">
      <Title text1={"Add"} text2={"Products"}/>

        <Form onSubmit={handleSubmit} className="p-4">
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="formlabel">Image</Form.Label>
                <Form.Control type="file" name="image"  accept="image/*" onChange={handleChange} />
              
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="formlabel">Name</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="formlabel">Category</Form.Label>
                <Form.Select name="category" onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categoryList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="add-category">➕ Add New Category</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label className="formlabel">Subcategory</Form.Label>
                <Form.Select name="subcategory" onChange={handleChange} disabled={!itemData.category}>
                  <option value="">Select Subcategory</option>
                  {categories[itemData.category]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                  <option value="add-subcategory">➕ Add New Subcategory</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>


          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="formlabel">Price</Form.Label>
                <Form.Control type="number" name="price" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
            <Form.Label className="formlabel">Shape</Form.Label>

              <Form.Group className="d-flex flex-row gap-5">
                {['Rectangle', 'Circle', 'Oval'].map((shape) => (
                  <Form.Check
                    key={shape}
                    type="checkbox"
                    label={shape}
                    name="shapes"
                    value={shape}
                    onChange={handleChange}
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label  className="formlabel">Sizes</Form.Label>
            <Row>
              {['4 inch', '6 inch', '8 inch', '10 inch'].map((size) => (
                <Col key={size} xs={2}>
                  <Form.Check
                    type="checkbox"
                    label={size}
                    name="sizes"
                    value={size}
                    onChange={handleChange}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group className="d-flex flex-row gap-5 mt-2">
                <Form.Check
                  type="radio"
                  label="Bestseller"
                  name="bestseller"
                  value="true"
                  onChange={handleChange}
                   className="formlabel "
                  />
                
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group className="d-flex flex-row gap-5 mt-2">
                <Form.Check
                  type="radio"
                  label="Customizable"
                  name="customizable"
                  value="true"
                  onChange={handleChange}
                   className="formlabel "
                  />
                
              </Form.Group>
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

        {/* Category Modal */}
        <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addCategory}>Add</Button>
        </Modal.Footer>
      </Modal>

      {/* Subcategory Modal */}
      <Modal show={showSubcategoryModal} onHide={() => setShowSubcategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter subcategory name" value={newSubcategory} onChange={(e) => setNewSubcategory(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addSubcategory}>Add</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default AddItem;
