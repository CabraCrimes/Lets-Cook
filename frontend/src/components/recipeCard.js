import "../styles/recipeCard.css";
import { useEffect, useState } from "react";

export const RecipeCard = (recipe) => {
  const cuisineNameList = recipe.recipe.cuisineType;
  // const [recipes, setRecipes] = useState(null);
  const [style, setStyle] = useState({ width: "18rem", height: "42rem" });
  const [favourites, setFavourites] = useState([]);
  // const favVariable = favourites.map(e => e.recipe.url)

  // const TestData = recipe.recipe;

  const capitalize = (stringArray) => {
    if (!stringArray) return [];
    else {
      return stringArray.map((string) => {
        if (string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
          return "";
        }
      });
    }
  };
  
  // useEffect(() => {
  //   setRecipes( ...favourites)
  // }, [favourites])
  
  // Put const isFav = favourites.some((fav) => fav.url === recipe.url); in a useState and then use a useState so the buttons change properly
  const toggleFavourites = (recipe) => {
    const isFav = favourites.some((fav) => fav.url === recipe.url);
    console.log(recipe.recipe)
    console.log("recipe.recipe",recipe.url)
    if (isFav) {
      console.log("TRUE!!!!")
      //Remove favourite
        setFavourites(prevFav =>  prevFav.filter(fav => fav.url !== recipe.url));
    }else {
      console.log("FALSE!!!!", recipe)
      setFavourites((prevFav) => [...prevFav, recipe ]);
    }
  };

  const toggleAccordion = () => {
    setStyle((prevState) =>
      prevState.height === "42rem"
        ? { width: "18rem" }
        : { width: "18rem", height: "42rem" }
    );
  };

  const cuisineName = capitalize(cuisineNameList);
  const accordionId = `accordionPanelsStayOpen${recipe.index}`;

  // if (favourites.some((e) => e.url === recipe.recipe.url)) {
  //   console.log("FAVOURIETS CONDITION:",true)
  //   //Remove favourite
  //   // setFavourites(prevFav =>  prevFav.filter(fav => fav.url !== recipe.recipe.url));
  // }else{
  //   console.log("FAVOURIETS CONDITION:",false)
  // }

  // console.log("Recipe",recipe.recipe)
  // console.log("Favourites number:", favourites.length);
  // console.log("Favourite Object:", favourites)
  // favourites.some((e) => console.log("FAV URL:",e.url))
  console.log("Favourites!!",favourites)

  return (
    <>
      <div>
        <div className="card" style={style}>
          <img
            src={recipe.recipe.image}
            className="card-img-top shadow bg-body rounded"
            alt={recipe.recipe.label}
          />
          <div className="card-body">
            <h4 className="p card-title">{recipe.recipe.label}</h4>
            <div className="p card-text">{cuisineName}</div>
          </div>
          <ul className="list-group list-group-flush">
            {/* accordion1 */}
            <div className="accordion accordion-flush" id={accordionId}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapseOne-${recipe.index}`}
                    aria-expanded={style.height === "42rem" ? "true" : "false"}
                    onClick={toggleAccordion}
                    aria-controls={`panelsStayOpen-collapseOne-${recipe.index}`}
                  >
                    <div className="p">
                      {recipe.recipe.ingredientLines.length} Ingredients
                    </div>
                    <div className="ms-3">
                      <i className="fa-solid fa-burger"></i>
                    </div>
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapseOne-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="p accordion-body">
                    {recipe.recipe.ingredientLines.map((list, i) => (
                      <div key={`${recipe.recipe.food}-${recipe.recipe.foodCategory}-${i}`}>{list}</div>
                    ))}
                  </div>
                </div>
              </div>
              {/* accordion2 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseTwo-${recipe.index}`}
                    aria-expanded={style.height === "42rem" ? "true" : "false"}
                    onClick={toggleAccordion}
                    aria-controls={`flush-collapseTwo-${recipe.index}`}
                  >
                    <div className="p"> Shopping List</div>
                    <div className="ms-3">
                      <i className="fa-solid fa-list-check"></i>
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapseTwo-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="p accordion-body">
                    {recipe.recipe.ingredients.map((e, i) => (
                      <div key={`${e.food}-${e.foodCategory}-${i}`}>
                        {`${capitalize([e.food])} (${capitalize([
                          e.foodCategory,
                        ])}: `}
                        <a href={e.image} className="card-link">
                          Image
                        </a>
                        {")"}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* accordion3 */}
              <div className="accordion-item ">
                <h2 className="accordion-header ">
                  <button
                    className="p accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseThree-${recipe.index}`}
                    aria-expanded={style.height === "42rem" ? "true" : "false"}
                    onClick={toggleAccordion}
                    aria-controls={`flush-collapseThree-${recipe.index}`}
                  >
                    <div className="p me-2">Recipe</div>
                    <i className="fa-solid fa-kitchen-set " />
                  </button>
                </h2>
                <div
                  id={`flush-collapseThree-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">
                    <div className="p">
                      <a href={recipe.recipe.url} className="card-link">
                        {recipe.recipe.source}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* accordion4 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseFour-${recipe.index}`}
                    aria-expanded={style.height === "42rem" ? "true" : "false"}
                    onClick={toggleAccordion}
                    aria-controls={`flush-collapseFour-${recipe.index}`}
                  >
                    <div className="p">Nutrition</div>
                    <div className="ms-3">
                      <i className="fa-solid fa-calculator"></i>
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapseFour-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">
                    <div className="p">
                      Calories: {Math.round(recipe.recipe.calories)}
                    </div>
                    <div
                      className="p"
                      key={`${recipe.recipe.calories}-${recipe.recipe.totalWeight}`}
                    >
                      {recipe.recipe.healthLabels.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <div className="d-flex justify-content-end card-footer text-body-secondary">
            <button
              type="button"
              className={
                " border border-0 btn " + (favVariable[0] === recipe.recipe.url ? "btn-primary btn-lg p-0 me-1" : "btn-outline-primary btn-lg p-0 me-1")
              }
              onClick={() => toggleFavourites(recipe.recipe)}
            >
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
