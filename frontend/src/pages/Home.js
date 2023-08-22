import "../styles/Home.css";
import { Navbar } from "../components/navbar";
// import { getRecipeApi } from "../api/recipeApi";
// {getRecipeApi()}

function Home() {
  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="container"></div>
      </div>
    </>
  );
}

export default Home;
