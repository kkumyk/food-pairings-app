require('dotenv').config();
const apiKey = process.env.API_KEY;

// http://localhost:5000/api/recipes/search?searchTerms=beef,+tomato&page=1&ranking=1&sort=max-used-ingredients&number=1

export const searchRecipes = async (searchTerms: string) => {
    if (!apiKey) {
        throw new Error("API key not found")
    }

    const ingredientsChecked = searchTerms.split(",").map(function (e) { return e.replace(/[^a-zA-Z]/g, "") }).join(",");
    // console.log(ingredientsChecked)

    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients"); // base URL

    const queryParams = {
        apiKey: apiKey,
        ingredients: ingredientsChecked,
        number: "99"
    }
    // attach query params to URL
    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);

        if (searchResponse.status === 200) {
            const resultsJson = await searchResponse.json();
            if (Array.isArray(resultsJson)) {
                let filteredResults = resultsJson.filter(recipe => recipe.unusedIngredients.length === 0);
                return (filteredResults.length !== 0) ? filteredResults : [{ title: "No recipes found.", image: "" }];
            }

        } else if (searchResponse.status === 402) {
            return [{ title: "Daily quota reached. ", image: "" }];
        } else {
            return [{ title: "No recipes found.", image: "" }]; //resultsJson;
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
