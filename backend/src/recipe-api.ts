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
        number: "1",
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

export const getRecipeIngredients = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }
    const url = new URL(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json`
    );
    const params = {
        apiKey: apiKey,
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const json = await response.json() as Object;

    let ing = Object.values(json).flat();

    let test: Array<string> = []

    if (Array.isArray(ing)) {
        ing.filter(i => test.push(i.name));
        console.log(test.join(", "))
        return { ingredients: test.join(", ") };
    } else {
        return ing;
    }
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

    return { results: json };
};