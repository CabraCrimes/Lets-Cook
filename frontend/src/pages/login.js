import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "../styles/login.css";

const Login = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backendUrl);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    uemail: "",
    upassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Login User Function
  const loginUser = async () => {
    try {
      const response = await fetch(backendUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.uemail,
          password: userInfo.upassword,
        }),
      });
      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("id", JSON.stringify(data.id));
        navigate("/");
        return true;
      } else alert("Wrong credentials");
    } catch (error) {
      console.error("Failed: ", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
      navigate("/");
    }
  };

  return (
    <React.Fragment>
        <div className="navbar-custom d-flex justify-content-between ps-5 py-3 ">
          <Link className="text-link " to={"/"}>
          <h1 className="text-light icon-link icon-link-hover me-4 "><i className="fa-solid fa-arrow-left"/></h1><h1 className="text-light icon-link icon-link-hover ">Lets Cook </h1>
          </Link>
        </div>
      <div className="container">
        <div className="container d-flex flex-column border bg-light mt-5 p-5 col-sm-8 col-md-6 col-lg-6 shadow rounded ">
          <h2 className="mb-5 text-center fw-bold">Login</h2>
          {/* input for email */}
          <div className="form-floating mb-2">
            <input
              name="uemail"
              type="email"
              className="form-control"
              id="emailForRegister"
              value={userInfo.uemail}
              onChange={handleChange}
            />
            <label htmlFor="emailForRegister" className="form-label">
              <i className="fa-solid fa-envelope me-2"></i>Email address
            </label>
          </div>
          {/* input for password */}
          <div className="form-floating">
            <input
              name="upassword"
              value={userInfo.upassword}
              type="password"
              id="inputPasswordRegister"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              onChange={handleChange}
            />
            <label htmlFor="inputPasswordRegister" className="form-label">
              <i className="fa-solid fa-lock me-2"></i>Password
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <button
                type="submit"
                className="buttons-body btn mt-3"
                onClick={() => loginUser()}
              >
                Submit
              </button>
            </div>
            <div className="mt-3">
              <Link to={"/register"}>
                <h3 type="button" className="buttons-body btn ">
                  Sign Up
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
