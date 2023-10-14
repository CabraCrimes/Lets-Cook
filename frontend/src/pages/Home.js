import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { fetchRecipes } from "../api/recipeApi";
// import {backgroundImage} from "../assets/Home/backgroundImage.jpg"
import { RecipeCard } from "../components/recipeCard";

function Home() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (newSearchTermFromNav) => {
    setSearchTerm(newSearchTermFromNav);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("search term:", searchTerm);
      const recipes = await fetchRecipes(searchTerm);
      const data = recipes?.hits?.map((e) => e.recipe) ?? [];
      console.log("Home Data",data);
      setRecipeData(data);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div className="background min-vh-100">
      <Navbar onSearchTermChange={handleSearchTermChange} />
      <div className="container container-with-background">
        <div className="d-grid gap-4 d-flex flex-wrap mt-5">
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

export default Home;
