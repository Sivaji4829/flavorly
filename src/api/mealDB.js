import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// Fetch initial recipes (e.g., starting with 'c')
export const getInitialRecipes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}search.php?f=c`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching initial recipes:', error);
    return [];
  }
};

/**
 * NEW: Fetches recipes by the first letter for the "Load More" button.
 * @param {string} letter The letter to fetch recipes for.
 * @returns {Promise<Array>} A promise resolving to an array of meals.
 */
export const fetchRecipesByLetter = async (letter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}search.php?f=${letter}`);
    return response.data.meals || [];
  } catch (error) {
    console.error(`Error fetching recipes for letter ${letter}:`, error);
    return [];
  }
};

// Search for recipes by meal name
export const searchRecipesByName = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error searching recipes by name:', error);
    return [];
  }
};

// Fetch a single recipe's details by its ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};

// In src/api/mealDB.js

// ... (keep the other functions as they are)

/**
 * NEW: Fetches recipes by category (e.g., "Vegetarian", "Seafood").
 * @param {string} category The category to filter by.
 * @returns {Promise<Array>} A promise resolving to an array of meals.
 */
export const getRecipesByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error)
  {
    console.error(`Error fetching recipes for category ${category}:`, error);
    return [];
  }
};