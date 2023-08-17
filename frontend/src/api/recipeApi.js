import React from "react";

const RECIPE_ID = process.env.RECIPE_APP_ID;
const RECIPE_KEY = process.env.RECIPE_APP_KEY;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2'

export const getRecipeApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching recipes: ', error)
    }
};