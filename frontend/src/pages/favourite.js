import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { Link, useLocation } from "react-router-dom";
// import {backgroundImage} from "../assets/Home/backgroundImage.jpg"
import { RecipeCard } from "../components/recipeCard";
import { backendFavouritesApi } from "../api/backEndFavouritesApi";

function Favourites() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourite, setFavourite] = useState([]);
  const location = useLocation();
    
  // need to make a fetch to the backend to we can get all the favourites and put these favourites in reipeData
  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    fetchData();
    getLocalData();
  }, [location.pathname]);

  const getLocalData = () => {
    try {
      const favouriteData = JSON.parse(localStorage.getItem("favourites"));
  
      if (Array.isArray(favouriteData)) {
        setFavourite((prevFavourites) => [...prevFavourites, ...favouriteData]);
      } else if (favouriteData) {
        // If it's not an array but a single object, handle it accordingly
        setFavourite((prevFavourites) => [...prevFavourites, favouriteData]);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };
  
// I think my JSON is not valid. I have to push eacg JSON object into its own array then I send it to the local session.
// READING MORE, PUSH THE JSON INTO AN ARRAY. An array of JSON
  const fetchData = async () => {
    try {
      const localData = await backendFavouritesApi();
      localStorage.setItem("favourites", localData.favourite.map((e) => e.favourite_JSON)
      );
      const favourites = JSON.parse(localStorage.getItem("favourites"));
      console.log("FAVOURITE", favourites);
    } catch (error) {
      console.error("Error feching favourites: ", error);
    }
  };

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
          {console.log("!!!!!!!!!!!!!!!!!!", favourite)}
          {console.log("¡¡¡¡¡¡¡¡¡¡¡¡", favourite.map(e=> e))}
          {!favourite.length
            ? "Add a favourite.."
            : favourite.map((newRecipe, index) => {
                return (
                  <RecipeCard
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
