import "./App.css";
import { FormEvent, useState } from "react";
import * as api from './api';
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";

const App = () => {
  // searchTerms will always give the most up to date value of the state object
  // setSearchTerms allows us to update searchTerms
  // the below line will be eventually tided to a form where we will capture the user's input
  // for now we hardcode the values ("beef,+tomatoes") to test the endpoint and to call it from our frontend

  const [searchTerms, setSearchTerms] = useState<string>(""); // beef,+tomatoes

  // state object
  const [recipes, setRecipes] = useState<Recipe[]>([]); // this state hook is going to contain an array of recipes

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

  // add a UI to call your endpoint from frontend - a button that will call handleSearchSubmit function
  return (
    <div>
      <form onSubmit={(event) => handleSearchSubmit(event)}>

        <input
          type="text"
          required
          placeholder="Enter two ingredients..."

          // set up a state hook to capture the input and to handle the change of the input
          value={searchTerms}
          onChange={(event) => setSearchTerms(event.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>

      {recipes.map((recipe) => (
        // <div>
        //   recipe image location: {recipe.image}
        //   recipe title: {recipe.title}
        // </div>
        <RecipeCard recipe={recipe}/>
      ))}
    </div>
  );
};

export default App; 