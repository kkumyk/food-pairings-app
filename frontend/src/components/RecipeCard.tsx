import { Recipe } from "../types"

interface Props {
    recipe: Recipe;
    onClick: () => void;
}

// create RecipeCard React component
const RecipeCard = ({ recipe, onClick }: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <div className="recipe-card-title"><h3>{recipe.title}</h3></div>
            <img src={recipe.image}></img>
        </div>
    );
};

export default RecipeCard;