import { Recipe } from "../types"

interface Props {
    recipe: Recipe
}


// create RecipeCard React component
const RecipeCard = ({recipe}: Props) => {

    return (

        <div className="recipe-card">

            <img src={recipe.image}></img>

            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>

        </div>
    );
};

export default RecipeCard;