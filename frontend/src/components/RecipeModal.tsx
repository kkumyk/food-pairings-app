import { useEffect, useState } from "react";
import { RecipeIngredients, RecipeInfo, RecipeInstructions } from "../types";
import * as RecipeAPI from "../api";

interface Props {
    recipeId: string;
    onClose: () => void;
}
const RecipeModal = ({ recipeId, onClose }: Props) => {
    // create state object to hold the recipe data whenever we call INGREDIENTS endpoint
    const [recipeInfo, getRecipeInfo] = useState<RecipeInfo>();
    const [recipeIngredients, getRecipeIngredients] = useState<RecipeIngredients[]>();
    const [recipeInstructions, getRecipeInstructions] = useState<RecipeInstructions[]>();

    useEffect(() => {
        const fetchRecipeInformation = async () => {
            try {
                const recipeInfo = await RecipeAPI.getRecipeInformation(recipeId);
                getRecipeInfo(recipeInfo);

                const recipeIngredients = recipeInfo.extendedIngredients;
                getRecipeIngredients(recipeIngredients);

                const recipeInstructions = recipeInfo.analyzedInstructions;
                console.log(recipeInstructions)
                getRecipeInstructions(recipeInstructions[0].steps);

            } catch (error) { console.log(error); }
        };
        fetchRecipeInformation();
    }, [recipeId]);
    if (!recipeInfo || !recipeIngredients || !recipeInstructions) {
        return <></>
    }
    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div className="modal-content">

                    <div className="modal-header">
                        <h2>Ingredients</h2>
                        <span className="close-btn" onClick={onClose}> &times; </span>
                    </div>

                    <div className="modal-ingredients">
                        {recipeIngredients.map((ingredient) => (

                            <div className="modal-ingredient">

                                <div className="modal-images">
                                    <img className="ingredient-image" src={`https://spoonacular.com/cdn/ingredients_100x100/` + ingredient.image} alt=""></img>
                                </div>

                                <div className="ingredient-name">
                                    <h4>{[ingredient.name]}</h4>
                                    <p>{ingredient.amount} {ingredient.unit}</p>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="modal-instructions">
                        <h2>Instructions</h2>
                        <ol>
                            {recipeInstructions.map((steps) => (
                                <p>{[<li>{steps.step}</li>]}</p>
                            ))}
                        </ol>
                    </div>

                </div>
            </div>
        </>
    );
};
export default RecipeModal;

