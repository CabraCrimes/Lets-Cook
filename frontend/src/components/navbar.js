import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../styles/navbar.css";
import { fetchRecipes } from "../api/recipeApi";

export const Navbar = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      console.log("search term", searchTerm);
      try {
        const data = await fetchRecipes(searchTerm);
        onSearchTermChange(searchTerm);
        console.log("onSearchTermChange", onSearchTermChange);
        console.log("handleSearch", data);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand  ms-4 me-5">
            <Link className="text-link" to="/">
              <h1>Lets Cook</h1>
            </Link>
          </div>
          {/* Burger button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
              <form className="d-flex " role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </ul>
            <div className="nav-item me-5">
              <Link className="text-link " to="/">
                Link
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
