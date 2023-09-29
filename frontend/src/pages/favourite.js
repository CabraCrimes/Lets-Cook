import { useCallback, useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { Link, useLocation } from "react-router-dom";
// import {backgroundImage} from "../assets/Home/backgroundImage.jpg"
import {FavouriteRecipeCard} from "../components/favouriteRecipeCard"
import { backendFavouritesApi } from "../api/backEndFavouritesApi";

function Favourites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const location = useLocation();

  // need to make a fetch to the backend to we can get all the favourites and put these favourites in reipeData
  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = await backendFavouritesApi();
        console.log("localData", localData);
        console.log(
          "HERE->",
          localData.favourite.map((e) => e.favourite_JSON)
        );
        const parseData = localData.favourite.map((e) =>
          JSON.parse(e.favourite_JSON)
        );
        console.log("PARSE", parseData);
        setFavouriteRecipes((prevFavourites) => [
          ...prevFavourites,
          ...parseData,
        ]);
      } catch (error) {
        console.error("Error feching favourites: ", error);
      }
    };
    fetchData();
  }, [location.pathname]);

  return (
    <div className="background min-vh-100">
      <Navbar onChange={handleSearchTermChange} />
      <div className="container container-with-background">
        <div className="d-flex">
          <h1 className="d-flex justify-content-start my-3 me-2 ">Recipes</h1>
          {/* this needs to be a component */}
          {/* <nav aria-label="Page navigation example ">
            <ul className="pagination mt-4">
              <li className="page-item">
                <a className="page-link" href="..." aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="..." aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
        <div className="d-grid gap-4 d-flex flex-wrap ">
          {console.log("!!!!", favouriteRecipes)}
          {console.log(
            "¡¡¡¡",
            favouriteRecipes.map((e) => e)
          )}
          {!favouriteRecipes.length
            ? "Add a favourite.."
            : favouriteRecipes.map((newRecipe, index) => {
                return (
                  <FavouriteRecipeCard 
                    key={newRecipe.calories}
                    recipe={newRecipe}
                    index={index}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Favourites;
