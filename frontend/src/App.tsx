import "./App.css";
import { FormEvent, useEffect, useState } from "react";
import * as api from './api';
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

type Tabs = "search" | "favourites";

const App = () => {
  // searchTerms will always give the most up to date value of the state object
  // setSearchTerms allows us to update searchTerms
  // the below line will be eventually tided to a form where we will capture the user's input
  // for now we hardcode the values ("beef,+tomatoes") to test the endpoint and to call it from our frontend

  const [searchTerms, setSearchTerms] = useState<string>(""); // beef,+tomatoes

  // state object
  // this uS hook is going to contain an array of recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  // add "Search" and "Favourites" tabs functionality to the frontend
  // we need to know which of the tabs the user had selected
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavoutriteRecipes] = useState<Recipe[]>([])


  // since we want to load the data when the app launches, we are going to use uE hook
  useEffect(() => {
    const fetchFavouriteRecipes = async () => {

      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavoutriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFavouriteRecipes();
  }, [])

  // add event handler that is going to call our backend endpoint
  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerms, 1, 1, "max-used-ingredients");
      setRecipes(recipes); // once setRecipes is called it will update the state and will trigger the component to re-render with the new data;
    } catch (e) {
      console.log(e)
    }
  }

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe); // adding recipe to the backend
      // add new favourite recipe to state
      setFavoutriteRecipes([...favouriteRecipes, recipe]) // updating the UI with the new favourite recipe

    } catch (error) {
      console.log(error);
    }
  }

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe); // this is the code that calls our API
      // iterate over recipes and only return recipes that are not equal to favRecipes ids
      const updateRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      // send updated array in the state
      setFavoutriteRecipes(updateRecipes);
    } catch (error) {
      console.log(error)
    }
  }

  // add a UI to call your endpoint from frontend - a button that will call handleSearchSubmit function
  return (
    <div className="app-container">
      <div className="header">
        <img src="/hero.jpg"></img>
        <div className="title">Food Pairing App</div>
      </div>
      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Food Pairing
        </h1>

        <h1
          className={selectedTab === "favourites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favourites")}>Favourites</h1>
      </div>

      {selectedTab === "search" && (<>

        <form onSubmit={(event) => handleSearchSubmit(event)}>
          <input
            type="text"
            required
            placeholder="Enter two ingredients..."
            // set up a state hook to capture the input and to handle the change of the input
            value={searchTerms}
            // onChange method is a callback function which takes the event and
            // sets the searchTerms value to event.target.value meaning it will
            // take any type of value typed inside the input field and assigned it to sSTfield
            onChange={(event) => setSearchTerms(event.target.value)}
          ></input>
          <button type="submit">
            <AiOutlineSearch size={40} />
          </button>
        </form>

        <div className="recipe-grid">

          {recipes.map((recipe) => {
            const isFavourite = favouriteRecipes.some(
              (favRecipe) => recipe.id === favRecipe.id
            );

            return (
              <RecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavouriteButtonClick={isFavourite ? removeFavouriteRecipe : addFavouriteRecipe}
                isFavourite={isFavourite}
              />
            );
          })}
        </div>
      </>
      )}

      {selectedTab === "favourites" && (
        <div className="recipe-grid">

          {favouriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={() => removeFavouriteRecipe}
              isFavourite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;