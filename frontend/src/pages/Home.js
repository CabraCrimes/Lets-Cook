import "../styles/Home.css";
import { Navbar } from "../components/navbar";
import { RecipeApi } from "../api/recipeApi";
import { RecipeCard } from "../components/recipeCard";

function Home() {
  const recipes = RecipeApi();

  if (!recipes || !recipes.hits) {
    <>
      <h1>Recipes</h1>
      <p>Loading...</p>
    </>;
  } else {
    console.log(recipes.hits.map((e) => e.recipe));
    const recipeData = recipes.hits.map((e) => e.recipe);
    return (
      <>
        <Navbar />
        <div className="Home">
          <div className="container">
            <h1>Recipes</h1>
            {recipeData.map((newRecipe, index) => {
              return <p key={index}>{newRecipe.label}</p>
            })}
            {/* <RecipeCard key={index} recipe={newRecipe} /> */}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
