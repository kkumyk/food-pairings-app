// create a function that will call our API search endpoint
// export your function to use in your component

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