import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import {ShopContext} from "../context/ShopContext"
import ProductItem from "./ProductItem"
import PropTypes from "prop-types"

const RelatedProduct = ({subcategory}) => {

  const { products, currency} =useContext(ShopContext);
  const [relatedproduct, setrelatedproduct] =useState([]);


  useEffect(()=>{
    if(products.length>0){
    let productcopy =products.slice();

    productcopy= productcopy.filter((item)=>subcategory===item.subcategory);
    
    setrelatedproduct(productcopy);
      // console.log(productcopy);
    }
    
  },[products,subcategory])
 
  return (
    <>
      <Title text1="Related" text2="Products"/>

      <div className="container">
  <div className="row">
    {relatedproduct.map((item) => (
    <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4  ">
      <div className="d-flex  justify-content-center ">
        <div   style={{ width: "100%", maxWidth: "250px" }}>
        <ProductItem
          id={item._id}
          image={item.image}
          name={item.name}
          currency={currency}
          price= {item.price}
        />
        </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}

RelatedProduct.propTypes = {
  subcategory: PropTypes.string.isRequired,
}
export default RelatedProduct
