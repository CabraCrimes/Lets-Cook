import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
      <div className="container">
        <div className="d-flex justify-content-between mt-3">
          <Link to={"/"}>
            <h1>Lets Cook</h1>
          </Link>
          {/* maybe make this a button */}
          <Link to={"/register"}>
            <h3 type="button" className="btn btn-dark">
              Sign Up
            </h3>
          </Link>
        </div>
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
              <i className="fa-solid fa-lock"></i>Password
            </label>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={() => loginUser()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
