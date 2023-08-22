import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        {/* Burger button */}
        <button
          className="navbar-toggler ms-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <div className="navbar-brand  ms-4 me-5">
          <Link className="text-link" to="/">
            <h1>Lets Cook</h1>
          </Link>
        </div>

        <ul className=" navbar-nav me-auto mb-2 mb-lg-0 d-flex">
          <li className="nav-item">
            <Link className="text-link" to="/">
              Link
            </Link>
          </li>
        </ul>

        <form className=" d-flex justify-content-center" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        </div>
      </nav>
    </>
  );
};
