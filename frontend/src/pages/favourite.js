import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
// import {backgroundImage} from "../assets/Home/backgroundImage.jpg"
import { RecipeCard } from "../components/recipeCard";
import { favouriteApi } from "../api/favouriteApi";
import { backendFavouritesApi } from "../api/backEndFavouritesApi";

function Favourites() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourite, setFavourite] = useState("")

// need to make a fetch to the backend to we can get all the favourites and put these favourites in reipeData
  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  
  useEffect(() => {
    setFavourite(backendFavouritesApi())
    const fetchData = async () => {
      // console.log("Favourites search term:", );
      const recipes = await favouriteApi(favourite);
      const data = recipes?.hits?.map((e) => e.recipe) ?? [];
      console.log(data);
      setRecipeData(data);
    };
    fetchData();
  }, [favourite]);

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
          {recipeData?.map((newRecipe, index) => {
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
