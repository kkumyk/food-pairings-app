import { Recipe } from "../types"
import { AiOutlineHeart } from 'react-icons/ai';
interface Props {
    recipe: Recipe;
    onClick: () => void;
    onFavouriteButtonClick: (recipe: Recipe) => void;
}

// create RecipeCard React component
const RecipeCard = ({ recipe, onClick, onFavouriteButtonClick }: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <div className="recipe-card-title">

                <span onClick={(event) => {
                    event.stopPropagation()
                    onFavouriteButtonClick(recipe);
                }}>
                    <AiOutlineHeart size={25} />
                </span>

                <h3>{recipe.title}</h3></div>
            <img src={recipe.image}></img>
        </div>
    );
};

export default RecipeCard;