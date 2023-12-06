require('dotenv').config();
const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerms: string, page: number, ranking: number, sortOption: string) => {
    if (!apiKey) {
        throw new Error("API key not found")
    }
    // base URL
    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");

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
            return resultsJson.filter(recipe => recipe.usedIngredientCount > 1);
        } else {
            return resultsJson;
        }

    } catch (error) {
        console.log(error);
    }
};

export const getRecipeSummary = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const url = new URL(
        `https://api.spoonacular.com/recipes/${recipeId}/summary`
    );
    const params = {
        apiKey: apiKey,
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const json = await response.json();

    return json;
};
