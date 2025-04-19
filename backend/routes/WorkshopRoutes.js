import express from "express"
import   {addWorkshop,updateWorkshop,listWorkshop,deleteWorkshop} from "../controllers/WorkshopController.js"
import adminAuth from "../middleware/AdminAuth.js"
import upload from "../middleware/multer.js"

const workshoprouter = express.Router()

workshoprouter.post("/addworkshop", adminAuth,upload.single("image") ,addWorkshop)
workshoprouter.post("/updateworkshop", adminAuth,updateWorkshop)
workshoprouter.post("/deleteworkshop", adminAuth, deleteWorkshop)
workshoprouter.get("/listworkshop", listWorkshop)


export default workshoprouter