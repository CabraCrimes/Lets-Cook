console.log("BASE_URL.env", process.env.REACT_APP_BASE_URL)
console.log(".env", process.env.REACT_APP_RECIPE_APP_KEY)
export const fetchRecipes = async (ingredient) => {
  try {
    if (ingredient) {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recipes/${ingredient}`);
      const data = await response.json();
      console.log("data", data)
      return data;
    } else {
      console.log("Ingredient is empty");
      return null
    };
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    return [];
  }
};
