import express from 'express'
import  {sendOtp,verifyOtp} from "../controllers/OtpController.js"

const otprouter = express.Router();

otprouter.post('/sendotp',sendOtp)
otprouter.post('/verifyotp',verifyOtp)


export default otprouter
