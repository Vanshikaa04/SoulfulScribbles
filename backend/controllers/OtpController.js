const otpStore = {}; // Temp in-memory store; you can use DB or Redis for production
import sendEmail from "../middleware/sendMail.js"


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = otp;
try{
  const emailContent = `
  Your OTP for Signup Verification is 
  ${otp}.
  Do not Share with Anyone 
`;

await sendEmail(email, "Signup Verification - Soulful Scribbles", emailContent);


  res.json ({success: true , message :"OTP Sent"})

} catch (err) {
  console.log(err)
  res.json ({success: false , message :err.message})
}
};

const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // Clear OTP after verification
    return res.json({ success: true,message:"Valid OTP" });
  }
  return res.status(400).json({ success: false, message: "Invalid OTP" });
};

export {sendOtp,verifyOtp}