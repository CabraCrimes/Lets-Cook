import "../styles/recipeCard.css";
import { useState } from "react";

export const FavouriteRecipeCard = (recipe) => {
  const cuisineNameList = recipe.recipe.cuisineType;
  const [style, setStyle] = useState({ width: "18rem", height: "42rem" });
  
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

  const deleteFavourites = async (favouriteId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("id"));
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/favourite/delete/${favouriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );
      if (response.ok) {
        console.log("Favorite removed!");
      } else {
        console.error("Failed to remove favourite");
      }
    } catch (error) {
      console.error("Error removing favourites: ", error);
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
                " border border-0 btn btn-primary btn-lg p-0 me-1" }
              
            onClick={() => {
              deleteFavourites(recipe.recipe.id);
              window.location.reload(false);
            }}
            >
              {console.log("ID@",recipe.recipe.id)}
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};