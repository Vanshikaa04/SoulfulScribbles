import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Bill from "../components/Bill";
import Title from "../components/Title";

const Cart = () => {
  const { cartitems, products, removeFromCart, currency } =useContext(ShopContext);
 const navigate = useNavigate();

  return (
    
      <>
    <div className="container my-5">
      <Title text1="Your Shopping" text2="Cart"></Title>
      {Object.keys(cartitems).length === 0 ? (
        <div className="text-center">
          <h4 className=" text-muted my-5">Your cart is empty.</h4>
          <Button
            style={{ backgroundColor: "var(--maincolor)" }}
            size="lg"
            className="text-center "
            onClick={()=> navigate('/collection')}
          >
            Shop Now
          </Button>
        </div>
      ) : (
       
        <div>
          <div className="d-flex flex-column gap-2">
           
            {Object.keys(cartitems).map((itemid) =>
              Object.keys(cartitems[itemid]).map((size) =>
                Object.keys(cartitems[itemid][size]).map((shape) => {
                  const quantity = cartitems[itemid][size][shape];
                  const product = products.find((p) => p._id == itemid);

                  if (!product) return null;
                  return (
                    <div
                      key={`${itemid}-${size}-${shape}`}
                      className="container border rounded p-3 my-3 shadow-sm"
                    >
                      <div className="row align-items-center">
                        {/* Product Image */}
                        <div className="col-4 col-md-2 text-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{ maxWidth: "100px", height: "auto" }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="col-8 col-md-5">
                          <Link
                            to={`/product/${itemid}`}
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <h5
                              className="fw-bold"
                              style={{ color: "var(--maincolor" }}
                            >
                              {product.name}
                            </h5>
                          </Link>

                          <p className="mb-1">
                            <b>Size:</b> {size}
                          </p>
                          <p className="mb-1">
                            <b>Shape:</b> {shape}
                          </p>
                        </div>

                        {/* Quantity & Price */}
                        <div className="col-12 col-md-3 text-md-center">
                          <p className="mb-1">
                            <b>Quantity:</b> {quantity}
                          </p>
                          <p className="mb-1 text-danger fw-bold">
                            {currency}
                            {product.price * quantity}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <div className="col-12 col-md-2 text-md-end">
                          <Button
                            variant="danger"
                            className="w-100"
                            onClick={() => removeFromCart(itemid, size, shape, quantity)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>

            <Bill/>
          <div className="d-flex justify-content-center align-items-center py-4">

            
            <Button
              style={{ backgroundColor: "var(--maincolor)", border: "none" }}
              size="lg"
              className="text-center px-5 py-2"
             onClick={()=>navigate("/place-order")}
            >
              Place Order
            </Button>
          </div>


        </div>
      )}
    </div>
     </>
    
    
  );
};

export default Cart;
