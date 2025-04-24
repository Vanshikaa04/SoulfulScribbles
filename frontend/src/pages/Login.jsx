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

const Login = () => {
  const { token, setToken, backendurl, user, setUser } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post(backendurl + "/api/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
       sessionStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      toast.success("Successfully Logged In!");
      navigate("/");
      console.log("token:", token);
      console.log("user:", user);
    }
  }, [token]);

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow className="d-flex justify-content-center align-items-center">
        {/* Image column */}
        <MDBCol md="6" className="d-none d-md-block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone"
          />
        </MDBCol>

        {/* Login form column */}
        <MDBCol xs="12" md="6" lg="4">
          <div className="mb-4">
            <label htmlFor="formControlLge" className="form-label">
              Email address
            </label>
            <MDBInput
              id="formControlLge"
              type="email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formControlLgp" className="form-label">
              Password
            </label>
            <MDBInput
              id="formControlLgp"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="d-flex justify-content-between mx-1 mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="/signup">Create account</a>
          </div>

          <div className="text-center">
            <MDBBtn
              className="mb-4 w-100"
              style={{ backgroundColor: "var(--maincolor)", height: "7vh" }}
              size="lg"
              onClick={onSubmit}
            >
              Log in
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
