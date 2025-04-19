import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { token, user, backendurl } = useContext(ShopContext);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [confpassword, setConfpassword] = useState([]);
  const [phone, setPhone] = useState([]);
  const [name, setName] = useState([]);

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (confpassword !== password) {
      return toast.error("Password and Confirm Password do not match");
    }
  
    try {
      const sendOtpRes = await axios.post(backendurl + "/api/otp/sendotp", { email });
  
      if (sendOtpRes.data.success) {
        toast.success("OTP sent to your email");
  
        const formData = { email, password, phone, name};
        navigate("/otp", { state: { formData } });
      }
    } catch (error) {
      toast.error("Failed to send OTP");
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      toast.success("Successfully Signed In !");
      sessionStorage.setItem('token',token)
      sessionStorage.setItem('user',JSON.stringify(user))
        console.log("SIgnUp Token :" + token+ "User Token: "+user)
      navigate("/");
    }
  });
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow className="justify-content-center align-items-center">
        {/* Left Side Image */}
        <MDBCol md="6" className="d-none d-md-block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Signup illustration"
          />
        </MDBCol>

        {/* Right Side Signup Form */}
        <MDBCol md="6" lg="5">
          <h3 className="text-center mb-4">Create an Account</h3>

          <div className="mb-4">
            <label htmlFor="formControlLge" className="form-label">
              Full Name
            </label>

            <MDBInput
              wrapperClass="mb-3"
              id="nameInput"
              type="text"
              size="lg"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formControlLge" className="form-label">
              Phone Number
            </label>
            <MDBInput
              wrapperClass="mb-3"
              id="phoneInput"
              type="tel"
              size="lg"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formControlLge" className="form-label">
              Email Address
            </label>
            <MDBInput
              wrapperClass="mb-3"
              id="emailInput"
              type="email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formControlLge" className="form-label">
              Password
            </label>
            <MDBInput
              wrapperClass="mb-3"
              id="passwordInput"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formControlLge" className="form-label">
              Confirm Password
            </label>
            <MDBInput
              wrapperClass="mb-3"
              id="confirmPasswordInput"
              type="password"
              size="lg"
              onChange={(e) => setConfpassword(e.target.value)}
              value={confpassword}
            />
          </div>

          <div className="d-flex justify-content-between mx-2 mb-3">
            <MDBCheckbox
              name="terms"
              id="termsCheck"
              label="I agree to the Terms & Conditions"
            />
          </div>

          <MDBBtn
  className="w-100"
  style={{
    boxShadow: "none",
    outline: "none",
    transform: "none",
  }}
  

  size="lg"
  onClick={onSubmit}
>
  Send OTP
</MDBBtn>


          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
