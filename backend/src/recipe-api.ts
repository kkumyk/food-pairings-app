require('dotenv').config();
const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerms: string, page: number, ranking: number, sortOption: string) => {
    if (!apiKey) {
        throw new Error("API key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients"); // base URL

    const queryParams = {
        apiKey: apiKey,
        ingredients: searchTerms,
        number: "99",
        ranking: "1",
        sort: "max-used-ingredients",
    }
    // attach query params to URL
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();

        if (Array.isArray(resultsJson)) {
            let filteredResults = resultsJson.filter(recipe => recipe.usedIngredientCount > 1);
            return filteredResults;
        } else {
            return resultsJson;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getRecipeInformation = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }
    const url = new URL(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false`
    );
    const params = {
        apiKey: apiKey,
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const informationObject = await response.json();
    return informationObject;
};

export const getFavouriteRecipesByIDs = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
    const params = {
        apiKey: apiKey,
        ids: ids.join(","),
    };
    url.search = new URLSearchParams(params).toString();

    const searchResponse = await fetch(url);
    const json = await searchResponse.json();

    if (Array.isArray(json)) {
        return { results: json };
    } else {
        return json;
    };
};
