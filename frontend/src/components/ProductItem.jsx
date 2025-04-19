import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import "./css_folder/product.css"

const ProductItem = ({ id, image, name, price, currency }) => {
  const pid = id.toString();

  return (
    <Link to={`/product/${pid}`} style={{ textDecoration: "none" }}>
      <Card
        className="product-card h-auto "
        style={{ backgroundColor: "var(--productcolor)", color: "white" , maxWidth:"220px"}}
      >
        <Image variant="top" src={image} className="product-image" />
        <Card.Body className="p-2 text-center">
          <Card.Title className="fs-6 mb-2">{name}</Card.Title>
          <h6 className="m-0">{currency} {price}</h6>
        </Card.Body>
      </Card>
    </Link>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
};

export default ProductItem;
