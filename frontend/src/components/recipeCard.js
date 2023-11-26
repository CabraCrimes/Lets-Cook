import "../styles/recipeCard.css";
import { useEffect, useState } from "react";

export const RecipeCard = (recipe) => {
  const cuisineNameList = recipe.recipe.cuisineType;
  // const [recipes, setRecipes] = useState(null);
  const [style, setStyle] = useState({ width: "18rem", height: "42rem" });
  const [favourites, setFavourites] = useState([]);
  const [isFav, setIsFav] = useState(false);

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

  useEffect(() => {
    const hasFavorites = (favourites ?? []).length > 0;
    setIsFav(hasFavorites);
  }, [favourites, isFav]);

  const saveFavourites = async (favourites) => {
    try {
      const userId = JSON.parse(localStorage.getItem("id"));
      const token = localStorage.getItem("token");
      if (favourites) {
        const favouriteJSON = JSON.stringify(favourites);
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/add/favourite",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              favourite_JSON: favouriteJSON,
              user_id: userId,
            }),
          }
        );
        if (response.ok) {
          // console.log("Favorite saved!");
        } else {
          console.error("Failed to save favourite");
        }
      } else {
        // console.log("Recipe data is empty");
      }
    } catch (error) {
      console.error("Error fetching favourites: ", error);
    }
  };

  const toggleFavourites = (recipe) => {
    if (isFav) {
      // console.log("TRUE: Remove Favourites");
      //Remove favourite
      setFavourites((prevFav) =>
        prevFav.filter((filterFav) => filterFav !== recipe)
      );
    } else {
      //Add favourites
      // console.log("FALSE: Add Favourites");
      setFavourites((prevFav) => [...prevFav, recipe]);
      saveFavourites(recipe);
    }
  };

  const toggleAccordion = () => {
    setStyle((prevState) =>
      prevState.height === "42rem"
        ? { width: "18rem" }
        : {
            width: "18rem",
            height: prevState.height === "42rem" ? "auto" : "42rem",
          }
    );
  };

  const cuisineName = capitalize(cuisineNameList);
  const accordionId = `accordionPanelsStayOpen${recipe.index}`;

  // const test = JSON.stringify(favourites);
  // console.log("Favourites!", test.length);
  // console.log("IsFav", isFav);

  return (
    <div>
      <div className="card-style card" style={style}>
        <img
          src={recipe.recipe.image}
          className="card-img-top shadow bg-body rounded"
          alt={recipe.recipe.label}
        />
        <div className="card-body">
          <h4 className="p card-title">{recipe.recipe.label}</h4>
          <div className="p card-text">{cuisineName}</div>
        </div>

        {/* accordion1 */}
        <div className="accordion accordion-flush" id={accordionId}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed row"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#panelsStayOpen-collapseOne-${recipe.index}`}
                aria-expanded={style.height === "42rem" ? "true" : "false"}
                onClick={toggleAccordion}
                aria-controls={`panelsStayOpen-collapseOne-${recipe.index}`}
              >
                 <div className="col-2">
                  <i className="fa-solid fa-burger"></i>
                </div>
                <div className="p col-6 p-0">
                  {recipe.recipe.ingredientLines.length} Ingredients
                </div>
                <div className="col p-0 d-flex justify-content-end">
                  {style.height === "42rem" ? (
                    <i className="fa-solid fa-chevron-down" />
                  ) : (
                    <i className="fa-solid fa-chevron-up" />
                  )}
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
                  <div
                    key={`${recipe.recipe.food}-${recipe.recipe.foodCategory}-${i}`}
                  >
                    {list}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* accordion2 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed row"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapseTwo-${recipe.index}`}
                aria-expanded={style.height === "42rem" ? "true" : "false"}
                onClick={toggleAccordion}
                aria-controls={`flush-collapseTwo-${recipe.index}`}
              >
                <div className="col-2">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <div className="p col-6 p-0"> 
                  Shopping List
                </div>
                <div className="col p-0 d-flex justify-content-end">
                  {style.height === "42rem" ? (
                    <i className="fa-solid fa-chevron-down " />
                  ) : (
                    <i className="fa-solid fa-chevron-up" />
                  )}
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
                className="p accordion-button collapsed row"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapseThree-${recipe.index}`}
                aria-expanded={style.height === "42rem" ? "true" : "false"}
                onClick={toggleAccordion}
                aria-controls={`flush-collapseThree-${recipe.index}`}
              >
                <div className="col-2">
                  <i className="fa-solid fa-kitchen-set " />
                </div>
                <div className="p col-6 p-0">
                  Recipe
                </div>
                
                <div className="col p-0 d-flex justify-content-end">
                  {style.height === "42rem" ? (
                    <i className="fa-solid fa-chevron-down" />
                  ) : (
                    <i className="fa-solid fa-chevron-up" />
                  )}
                </div>
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
                className="accordion-button collapsed row"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapseFour-${recipe.index}`}
                aria-expanded={style.height === "42rem" ? "true" : "false"}
                onClick={toggleAccordion}
                aria-controls={`flush-collapseFour-${recipe.index}`}
              >
                <div className="col-2">
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <div className="p col-6 p-0">
                  Nutrition
                </div>
                
                <div className="col p-0 d-flex justify-content-end">
                  {style.height === "42rem" ? (
                    <i className="fa-solid fa-chevron-down" />
                  ) : (
                    <i className="fa-solid fa-chevron-up" />
                  )}
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

        <div className="d-flex justify-content-end card-footer text-body-secondary">
          <button
            type="button"
            className={
              " border border-0 btn " +
              (isFav
                ? "btn-light btn-md p-1 px-3 py-2 me-1"
                : "btn-outline-light btn-md p-1 px-3 py-2 me-1")
            }
            onClick={() => toggleFavourites(recipe.recipe)}
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
