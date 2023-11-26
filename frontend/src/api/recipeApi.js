export const fetchRecipes = async (ingredient) => {
  try {
    if (ingredient) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/recipes/${ingredient}`
      );
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    return [];
  }
};
