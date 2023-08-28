// import { useEffect } from "react";

const BASE_URL = "http://127.0.0.1:5000/api";

// export const RecipeApi = (ingredient) => {
//   // const [recipes, setRecipes] = useState([]);
//   useEffect(() => {
//     fetchRecipes(ingredient);
//   }, [ingredient]);
//   // return recipes;
// };

export const fetchRecipes = async (ingredient) => {
  try {
    console.log("API ingredient", ingredient)
    if (ingredient) {
      const response = await fetch(`${BASE_URL}/recipes/${ingredient}`);
      const data = await response.json();
      console.log("API response data", data)
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
