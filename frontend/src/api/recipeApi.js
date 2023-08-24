import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:5000/api";

export const RecipeApi = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const ingredient = "chicken";
        const response = await fetch(`${BASE_URL}/recipes/${ingredient}`);
        const data = await response.json();
        setRecipes(data) ;
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };
    fetchRecipes();
  }, []);
  return recipes;
};
