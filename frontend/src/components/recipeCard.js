import React from "react";

export const RecipeCard = (recipe) => {
  const cuisineNameList = recipe.recipe.cuisineType;
  const capitilize = ([string]) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const cuisineName = capitilize(cuisineNameList);
  console.log(recipe.index);
  
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
                  Recipe
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapseOne-${recipe.index}`}
                className="accordion-collapse collapse"
                data-bs-parent={`#${accordionId}`}
              >
                <div className="accordion-body">
                  <p>{recipe.recipe.ingredientLines}</p>
                </div>
              </div>
            </div>
            {/* accordion2 */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapseTwo-${recipe.index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapseTwo-${recipe.index}`}
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id={`flush-collapseTwo-${recipe.index}`} 
                className="accordion-collapse collapse"
                data-bs-parent={`#${accordionId}`}
              >
                <div className="accordion-body">
                  Placeholder content for this accordion, which is intended to
                  demonstrate the <code>.accordion-flush</code> className. This
                  is the second item's accordion body. Let's imagine this being
                  filled with some actual content.
                </div>
              </div>
            </div> */}
            {/* accordion3 */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Placeholder content for this accordion, which is intended to
                  demonstrate the <code>.accordion-flush</code> className. This
                  is the third item's accordion body. Nothing more exciting
                  happening here in terms of content, but just filling up the
                  space to make it look, at least at first glance, a bit more
                  representative of how this would look in a real-world
                  application.
                </div>
              </div>
            </div> */}
          </div>
        </ul>
        <div className="card-body">
          <a href="..." className="card-link">
            Card link
          </a>
          <a href="..." className="card-link">
            Another link
          </a>
        </div>
      </div>
      </div>
    </>
  );
};
