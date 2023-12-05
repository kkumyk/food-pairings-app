import express from 'express';
import cors from 'cors';
import * as RecipeAPI from './recipe-api';

/*
Next call an endpoint from your backend
https://api.spoonacular.com/recipes/findByIngredients?apiKey=YOUR-KEYd&ingredients=beef,tomatoes
for this to happen, import the contents of the recipe-api.ts file
*/

// this line creates a new express app;
const app = express();

/*
converts the body of requests and responses we make them into json
so that we don't need to do it manually every time we a request;
*/
app.use(express.json());

// takes care of the security of the requests
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
    const searchTerms = req.query.searchTerms as string;
    const page = parseInt(req.query.page as string);
    const ranking = parseInt(req.query.ranking as string);
    const sort = req.query.sortOption as string;

    const results = await RecipeAPI.searchRecipes(searchTerms, page, ranking, sort);
    return res.json(results);
})

/*
- a function to start the app
- the first parameter is going to be the port
- the second parameter is not necessary but helpful to have
- it is a function that runs after the app has started 
*/
app.listen(5000, () => {
    console.log("server running on localhost:5000");
});
