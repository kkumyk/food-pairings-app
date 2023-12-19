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

// export const getRecipeIngredients = async (recipeId: string) => {
//     if (!apiKey) {
//         throw new Error("API Key not found");
//     }
//     const url = new URL(
//         `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json`
//     );
//     const params = {
//         apiKey: apiKey,
//     };
//     url.search = new URLSearchParams(params).toString();
//     const response = await fetch(url);
//     const json = await response.json() as Object;

//     let ing = Object.values(json).flat();

//     let test: Array<string> = []

//     if (Array.isArray(ing)) {
//         ing.filter(i => test.push(i.name));
//         console.log(test.join(", "))
//         return { ingredients: test.join(", ") };
//     } else {
//         return ing;
//     }
// };

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

    let ingredientsResults = Object.values(json).flat();

    // define type for extracted results and initialise it with an empty array;
    let ingredientsNames: Array<string> = [];
    
    // TODO 1: properly annotate type for names results and remove the if condition
    /* TODO 2:
    extract unit & value for each ingredient and return them on separate lines
        "amount": {
        "metric": {
            "unit": "g",
            "value": 222.0
        }
    */
    if (Array.isArray(ingredientsResults)) {
        ingredientsResults.filter(i => ingredientsNames.push(i.name));
        // console.log(ingredientsNames.join(", "))
        return { ingredients: ingredientsNames.join(", ") };
    } else {
        return ingredientsResults;
    }
};

// TODO 4: add function to remove the favourite recipes from the favourite tab as well;

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