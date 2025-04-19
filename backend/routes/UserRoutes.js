import express from "express"

const router = express.Router()
import  {addUser, loginUser, adminLogin,updateUserInfo} from "../controllers/UserController.js"


//API

router.post("/register", addUser)
router.post("/login",loginUser)
router.post("/admin",adminLogin)
router.post("/updateuser",updateUserInfo)


export default router