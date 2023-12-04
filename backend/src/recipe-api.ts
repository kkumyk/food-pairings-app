const apiKey = process.env.API_KEY;
// const apiKey = "YOUR-KEY";

export const searchRecipes = async (searchTerms: string, page: number) => {
    if (!apiKey) {
        throw new Error("API key not found")
    }
    // base URL
    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");

    const queryParams = {
        apiKey: apiKey,
        ingredients: searchTerms,
        number: "10"
    }
    // attach query params to URL
    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    } catch (error) {
        console.log(error);
    }
};