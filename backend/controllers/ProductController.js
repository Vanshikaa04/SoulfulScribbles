import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/ProductModel.js";

//Adding Product
const addProduct = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const {
      name,
      description,
      category,
      subcategory,
      price,
      sizes,
      shapes,
      bestseller,
      customizable,
    } = req.body;
    const image = req.file;

    const isBestseller = bestseller === "true";
    const isCustomizable = customizable === "true";

    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageUrl = uploadResponse.secure_url;

    const productData ={
      name,
      description,
      category,
      subcategory,
      price :Number(price),
      sizes : sizes ? JSON.parse(sizes) : [],
      shapes : shapes ? JSON.parse(shapes) : [],
      bestseller: isBestseller,
      customizable: isCustomizable ,
      image:imageUrl,
      date:Date.now()
    };

    const product =new ProductModel(productData)
    await product.save()

    return res.json({ success: true, message: "product added" });

} catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Listing Product
const listProducts = async (req, res) => {
    try {
        const products =await ProductModel.find({});
        res.json({success:true, products})
    } catch (error) {
        console.log(error);
    return res.json({ success: false, message: error.message });
    }
};

//removing product
const removeProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.body.id)
    return res.json({ success: true, message: "product removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//Single Product Info
const singleProduct = async (req, res) => {
    try {
         const {productid}= req.body
         const product = await ProductModel.findById(productid)
         res.json({success:true, product})
    } catch (error) {
        console.log(error); 
        return res.json({ success: false, message: error.message });
      }
};

const updateProduct =async (req,res) =>{
  try {
    const {_id, name,price,category,subcategory}= req.body
    if (!_id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
    { name,price ,category,subcategory },
    { new: true } // Return the updated product
  );
  if (!updatedProduct) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, message: "Product updated successfully", product: updatedProduct });


  } catch (error) {
    console.log(error); 
        return res.json({ success: false, message: error.message });
  }
}
export { addProduct, listProducts, removeProduct, singleProduct,updateProduct };
