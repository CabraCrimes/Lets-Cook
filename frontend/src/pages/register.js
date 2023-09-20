import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backendUrl);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    uusername: "",
    uemail: "",
    upassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const registerUser = async () => {
    const response = await fetch(backendUrl + "/create/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.uusername,
        email: userInfo.uemail,
        password: userInfo.upassword,
      }),
    });

    if (response.ok) navigate("/login");
    else alert("Email already in use");
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="d-flex justify-content-between mt-3">
          <Link to={"/"}>
            <h1>Lets Cook</h1>
          </Link>
          {/* maybe make this a button */}
          <Link to={"/login"}>
            <h3 type="button" className="btn btn-dark">
              Login
            </h3>
          </Link>
        </div>
        <div className="container d-flex flex-column border bg-light mt-5 p-5 col-sm-8 col-md-6 col-lg-6 shadow rounded ">
          <h2 className="mb-5 text-center fw-bold">Sign Up</h2>
          <div className="form-floating mb-2">
            {/* input for name */}
            <input
              name="uusername"
              type="text"
              className="form-control"
              id="nameForRegister"
              value={userInfo.uusername}
              onChange={handleChange}
            />
            <label htmlFor="nameForRegister" className="form-label">
              <i className="fa-solid fa-envelope me-2"></i>Name
            </label>
          </div>
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
          <div className="form-floating">
            {/* input for password */}
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
              onClick={() => registerUser()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Register;
