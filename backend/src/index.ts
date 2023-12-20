import express from 'express';
import cors from 'cors';
import * as RecipeAPI from './recipe-api';
import { PrismaClient } from "@prisma/client"

/*
Next call an endpoint from your backend
https://api.spoonacular.com/recipes/findByIngredients?apiKey=YOUR-KEYd&ingredients=beef,+tomatoes
for this to happen, import the contents of the recipe-api.ts file
*/

// this line creates a new express app;
const app = express();

// http://localhost:5000/api/recipes/search?searchTerms=beef,+tomatoes&page=1&ranking=1&sort=max-used-ingredients&number=1
// http://localhost:5000/api/recipes/646572/ingredients

// http://localhost:5000/api/recipes/716429/information?includeNutrition=false

// https://api.spoonacular.com/recipes/716429/information?includeNutrition=false

const prismaClient = new PrismaClient();

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

// app.get("/api/recipes/:recipeId/ingredients", async (req, res) => {
//     const recipeId = req.params.recipeId;
//     const results = await RecipeAPI.getRecipeIngredients(recipeId);
//     return res.json(results);
// });


app.get("/api/recipes/:recipeId/information", async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeInformation(recipeId);
    return res.json(results);
});




app.post("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;

    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create({
            data: {
                recipeId: recipeId, // take recipe id from the endpoint
            },
        });
        return res.status(201).json(favouriteRecipe);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Oops, something went wrong" });
    }
});

app.get("/api/recipes/favourite", async (req, res) => {

    try {
        const recipes = await prismaClient.favouriteRecipes.findMany();
        const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

        const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds);

        return res.json(favourites);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Oops, something went wrong" });
    }
});


app.delete("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;

    try {
        await prismaClient.favouriteRecipes.delete({
            where: {
                recipeId: recipeId,
            },
        });
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Oops, something went wrong" });
    }
});

/*
- a function to start the app
- the first parameter is going to be the port
- the second parameter is not necessary but helpful to have
- it is a function that runs after the app has started 
*/
app.listen(5000, () => {
    console.log("server running on localhost:5000");
});