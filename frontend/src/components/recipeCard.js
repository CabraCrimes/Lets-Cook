import React from "react";

export const RecipeCard = (recipe) => {
  const cuisineNameList = recipe.recipe.cuisineType;

  const shoppingFood = recipe.recipe;
  console.log(shoppingFood);

  const capitalize = (stringArray) => {
    return stringArray.map(
      (string) => string.charAt(0).toUpperCase() + string.slice(1)
    );
  };

  const cuisineName = capitalize(cuisineNameList);

  const accordionId = `accordionPanelsStayOpen${recipe.index}`;

  return (
    <>
      <div className="col d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={recipe.recipe.image}
            className="card-img-top"
            alt={recipe.recipe.label}
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.recipe.label}</h5>
            <p className="card-text">{cuisineName}</p>
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
                    aria-expanded="false"
                    aria-controls={`panelsStayOpen-collapseOne-${recipe.index}`}
                  >
                    <p>{recipe.recipe.ingredientLines.length} Ingredients</p>
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapseOne-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">
                    {recipe.recipe.ingredientLines.map((list, i) => (
                      <p key={i}>{list}</p>
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
                    aria-expanded="false"
                    aria-controls={`flush-collapseTwo-${recipe.index}`}
                  >
                    Shopping List
                  </button>
                </h2>
                <div
                  id={`flush-collapseTwo-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">
                    {recipe.recipe.ingredients.map((e,i) => (
                      <p key={`${e.food}-${e.foodCategory}-${i}`}>
                        {`${capitalize([e.food])} (${capitalize([
                          e.foodCategory
                        ])}: `}
                        <a href={e.image} className="card-link">
                          Image
                        </a>{")"}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {/* accordion3 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapseThree-${recipe.index}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapseThree-${recipe.index}`}
                  >
                    Recipe
                  </button>
                </h2>
                <div
                  id={`flush-collapseThree-${recipe.index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">
                    <p><a href={recipe.recipe.url} className="card-link">{recipe.recipe.source}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <div className="card-footer text-body-secondary">
            <a href="..." className="card-link"> 
              Calories: {Math.round(recipe.recipe.calories)}
              </a>
              </div>
        </div>
      </div>
    </>
  );
};

