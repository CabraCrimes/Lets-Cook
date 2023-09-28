import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../styles/navbar.css";
import { fetchRecipes } from "../api/recipeApi";

export const Navbar = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      console.log("search term", searchTerm);
      try {
        const data = await fetchRecipes(searchTerm);
        onSearchTermChange(searchTerm);
        console.log("Nav handleSearch", data);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    }
  };

  // Remove quotes etc from the begging and end of strings
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

  return (
    <>
      <nav className="navbar navbar-custom navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand  ms-4 me-5">
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
              <div className="d-flex justify-content-between mt-sm-2">
                <div className="text-light me-3 fs-5 text">Welcome {user}</div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-outline-light "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <Link className="text-link" to="favourites">
                    <button
                      type="button"
                      className="btn btn-outline-light fs-6 text ms-2 me-3"
                    >
                      Favorites
                    </button>
                  </Link>
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
