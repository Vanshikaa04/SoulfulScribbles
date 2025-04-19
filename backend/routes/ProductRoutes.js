import express from 'express'
import  {addProduct, listProducts, removeProduct, singleProduct, updateProduct} from "../controllers/ProductController.js"
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/AdminAuth.js';

const productrouter = express.Router();

productrouter.post('/add',adminAuth,upload.single("image"),addProduct);
productrouter.post('/remove',adminAuth,removeProduct);
productrouter.get('/list',listProducts);
productrouter.post('/single',singleProduct);
productrouter.post('/update',adminAuth,updateProduct);


export default productrouter
