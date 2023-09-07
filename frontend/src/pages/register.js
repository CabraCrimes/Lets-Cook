import React from "react";

const Register = () => {
  return (
    <React.Fragment>
      <div className="container d-flex flex-column border bg-light mt-5 p-5 col-sm-12 col-sm-6 col-md-4 shadow rounded">
        <div className=" ">
        <h2 className="mb-5 text-center fw-bold">Register</h2>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="emailForRegister"
              placeholder="Email address"
            />
            <label htmlFor="emailForRegister" className="form-label">
            <i className="fa-solid fa-envelope me-2"></i>Email address
            </label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              id="inputPasswordRegister"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              placeholder="..."
            />
            <label htmlFor="inputPasswordRegister" className="form-label">
              Password
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Register;
