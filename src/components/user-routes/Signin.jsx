import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container
} from "reactstrap";
import "../../styles/signin.css";
import { doLogin } from "../auth/auth";
import Base from "../main/Base";
import { login } from "../services/user-service";

const Signin = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e, property) => {
    let actualValue = e.target.value;
    setLoginDetails({ ...loginDetails, [property]: actualValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(loginDetails);

    if (
      loginDetails.username.trim() === "" ||
      loginDetails.password.trim() === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // call server to generate token
    login(loginDetails)
      .then((jwtTokenData) => {
        // console.log(jwtTokenData);

        doLogin(jwtTokenData, () => {
          // console.log("login detail is saved to local storage");
          // redirect to home page
          navigate("/");
        });

        toast.success("Login successful!");
        // localStorage.setItem('jwtToken', jwtTokenData.token);
        // localStorage.setItem('user', JSON.stringify(jwtTokenData.user));
        // window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 404) {
          toast.error("Credentials invalid!");
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  // const handleReset = () => {
  //   setLoginDetails({
  //     username: "",
  //     password: "",
  //   });
  // };

  return (
    <Base>
      <Container>
        <div className="signin-body">
          <div class="signin-container">
            <div class="login-box">
              <img src="logo/Asset 14.png" alt="Logo" class="logo" />
              <h1>Welcome Back!</h1>
              <form onSubmit={handleSubmit}>
                <div class="input-box">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    id="username"
                    value={loginDetails.username}
                    onChange={(e) => handleChange(e, "username")}
                  />
                </div>
                <div class="input-box">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    value={loginDetails.password}
                    onChange={(e) => handleChange(e, "password")}
                  />
                </div>
                <div class="checkbox-box">
                  <input type="checkbox" id="remember-me" />
                  <label for="remember-me">Remember me</label>
                </div>
                <button className="sign-button" type="submit">
                  Login
                </button>
              </form>
              {/* <a href="#">Forgot password?</a> */}
            </div>
          </div>
        </div>
      </Container>
    </Base>
  );
};

export default Signin;
