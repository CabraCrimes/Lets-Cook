import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../styles/navbar.css";
// import { fetchRecipes } from "../api/recipeApi";

export const Navbar = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      try {
        onSearchTermChange(searchTerm);
        // console.log("Nav handleSearch Test", data);
      } catch (error) {
        console.error("Error search term: ", error);
      }
    }
  };

  // Remove quotes from the begging and end of strings
  // const removeQuotes = (string) => {
  //   if (string && string.startsWith('"') && string.endsWith('"')) {
  //     return string.slice(0, -1);
  //   } else return string;
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favourites");
    localStorage.removeItem("id");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataJson = localStorage.getItem("user");
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      if (token) setUser(userData);
    }
  }, []);

  const handleFavourites = () => {
    const currentPath = window.location.pathname;

    if (currentPath !== "/favourites") {
      navigate("/favourites");
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <nav className="navbar navbar-custom navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand ms-4 me-5">
            <Link className="text-link" to="/">
              <h1 className="text-light">Lets Cook</h1>
            </Link>
          </div>
          {/* Burger button */}
          <button
            className="navbar-toggler mb-2"
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
                  className="btn btn btn-outline-light"
                  type="submit"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </ul>
            {user ? (
              // Create a drop down here
              <div className="d-flex justify-content-end me-4">
                <div className="text-light me-3 fs-5 text">Welcome {user}</div>
                <div className="btn-group dropstart">
                  <button
                    className="btn btn-outline-light rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-regular fa-user"></i>
                  </button>
                  <ul className="dropdown-menu pe-3">
                    <li>
                      <button
                        className="btn btn-outline-dark dropdown-item ms-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <div className="">
                      <Link className="text-link" to="favourites">
                        <button
                          type="button"
                          className="btn btn-outline-dark dropdown-item fs-6 text ms-2 me-3"
                          onClick={handleFavourites}
                        >
                          Favorites
                        </button>
                      </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="nav-item me-5">
                <Link className="text-link" to="login">
                  <button
                    type="button"
                    className="btn btn-outline-light fs-6 text"
                  >
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
