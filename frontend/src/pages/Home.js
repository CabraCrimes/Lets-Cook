import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { fetchRecipes } from "../api/recipeApi";
// import {backgroundImage} from "../assets/Home/backgroundImage.jpg"
import { RecipeCard } from "../components/recipeCard";

function Home() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
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
    <div className="background min-vh-100">
      <Navbar onSearchTermChange={handleSearchTermChange} />
      <div className="container container-with-background">
        {/* <div className="d-flex">
        !!! this needs to be a component and added later !!!
        <h1 className="d-flex justify-content-start my-3 me-2 ">Recipes</h1>
          <nav aria-label="Page navigation example ">
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
          </nav>
        </div> */}
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
