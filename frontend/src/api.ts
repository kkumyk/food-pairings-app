// create a function that will call our API search endpoint
// export your function to use in your component

import { Recipe } from "./types";

export const searchRecipes = async (searchTerms: string, page: number, ranking: number, sortOption: string) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/search"); // this is where our endpoint is in our node backend; 

  // add query params
  baseUrl.searchParams.append("searchTerms", searchTerms)
  baseUrl.searchParams.append("page", String(page))
  baseUrl.searchParams.append("ranking", String(ranking))
  baseUrl.searchParams.append("sortOption", sortOption)

  // make a fetch request
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json();
}

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getFavouriteRecipes = async () => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const addFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");

  const body = {
    recipeId: recipe.id
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const removeFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const body = {
    recipeId: recipe.id,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};