import express from "express"
import { addtoCart ,updateCart, getUserCart, removefromCart} from "../controllers/CartController.js"
import userAuth from '../middleware/UserAuth.js';

const cartRouter = express.Router()

cartRouter.post("/getcart", userAuth,getUserCart)
cartRouter.post("/add", userAuth,addtoCart)
cartRouter.post("/update",userAuth, updateCart)
cartRouter.post("/remove",userAuth,removefromCart)


export default cartRouter
