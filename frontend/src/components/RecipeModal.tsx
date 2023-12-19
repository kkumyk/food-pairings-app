import { useEffect, useState } from "react";
import { RecipeIngredients } from "../types";
import * as RecipeAPI from "../api";

interface Props {
    recipeId: string;
    onClose: () => void;
}
const RecipeModal = ({ recipeId, onClose }: Props) => {
    // create state object to hold the recipe data whenever we call INGREDIENTS endpoint
    const [recipeIngredients, getRecipeIngredients] = useState<RecipeIngredients[]>([]);
   
    useEffect(() => {
        const fetchRecipeIngredients = async () => {
            try {
                const recipeIngredients = await RecipeAPI.getRecipeIngredients(recipeId);
                getRecipeIngredients(recipeIngredients.ingredients);
            } catch (error) { console.log(error); }
        };
        fetchRecipeIngredients();
    }, [recipeId]);
    if (!recipeIngredients) {
        return <></>
    }
    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Ingredients List</h2>
                        <span className="close-btn" onClick={onClose}> &times; </span>
                    </div>

                    {recipeIngredients.map((ingredient) => (
                        <h3>{[ingredient.name]}</h3>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RecipeModal;

