import mongoose from "mongoose"

const productSchema =new mongoose.Schema(
    {
        name: {type: String, required:true},
        description: {type: String, required:true},
        price: {type: Number, required:true},
        image:{type: String, required:true},
        category :{type: String, required:true},
        subcategory :{type: String, required:true},
        sizes: {type: Array, required:true},
        shapes: {type: Array, required:true},
        bestseller :{type: Boolean},
        customizable :{type:Boolean},
        date: {type: Number, required:true}
    }
)

const ProductModel = mongoose.model.product || mongoose.model("product",productSchema);
export default ProductModel