import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { fetchRecipes } from "../api/recipeApi";
import { RecipeCard } from "../components/recipeCard";

function Home() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm)
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log("search term:", searchTerm);
      const recipes = await fetchRecipes(searchTerm);
      const data = recipes?.hits?.map((e) => e.recipe) ?? [];
      console.log(data);
      setRecipeData(data);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Navbar onSearchTermChange={handleSearchTermChange} />
      <div className="container">
        <h1 className="d-flex justify-content-center my-3 ">Recipes</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
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
    </>
  );
}

export default Home;
