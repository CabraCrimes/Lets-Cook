import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { Link, useLocation } from "react-router-dom";
// import {backgroundImage} from "../assets/Home/backgroundImage.jpg"
import { FavouriteRecipeCard } from "../components/favouriteRecipeCard";
import { backendFavouritesApi } from "../api/backEndFavouritesApi";

function Favourites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  // const [filterFavouriteRecipes, setFilterFavouriteRecipes] = useState([]);
  const location = useLocation();

  const handleSearchTermChange = (newSearchTermFromNav) => {
    setSearchTerm(newSearchTermFromNav);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("search term:", searchTerm);
        const localData = await backendFavouritesApi();
        const parsedFavourites = localData.favourite.map((e) => {
          const parsJSON = JSON.parse(e.favourite_JSON);
          return { id: e.id, ...parsJSON };
        });

        setFavouriteRecipes(() => [...parsedFavourites]);
        if (searchTerm) {
          const filterFavourite = () => {
            const filter = parsedFavourites.filter((item) =>
              [...item.label].some((char) => searchTerm.includes(char))
            );
            setFavouriteRecipes(filter);
          };
          filterFavourite();
        }
      } catch (error) {
        console.error("Error feching favourites: ", error);
      }
    };
    fetchData();
  }, [location.pathname, searchTerm]);

  return (
    <div className="background min-vh-100">
      <Navbar onSearchTermChange={handleSearchTermChange} />
      <div className="container container-with-background">
        <div className="d-grid gap-4 d-flex flex-wrap mt-5">
          {!favouriteRecipes.length
            ? "Add a favourite.."
            : favouriteRecipes.map((newRecipe, index) => {
                return (
                  <FavouriteRecipeCard
                    key={newRecipe.id}
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
