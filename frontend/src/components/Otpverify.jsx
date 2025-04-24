import { useState,useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Otpverify=()=> {

  const [otp, setOtp] = useState("");
  const {backendurl,setToken, setUser} = useContext(ShopContext)
  const location = useLocation();
  const { formData } = location.state || {};
  const navigate = useNavigate()
  
  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post(backendurl+"/api/otp/verifyotp", {
        email: formData.email,
        otp,
      });

      if (res.data.success) {
        const registerRes = await axios.post(backendurl+"/api/user/register", formData);
        toast.success("Signup successful!");
        setToken( registerRes.data.token);
        setUser(registerRes.data.user)
        navigate("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("User Already Exists");
      console.log("Error :" ,error)
    }
  };
    return (
        <MDBContainer className="p-5">
          <h3 className="mb-4">Enter OTP sent to your email</h3>
          <MDBInput
  
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-3"
          />
          <MDBBtn onClick={handleOtpSubmit}>Verify & Create Account</MDBBtn>
        </MDBContainer>
      );
}

export default Otpverify;