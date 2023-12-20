import { useEffect, useState } from "react";
import { RecipeIngredients } from "../types";
import * as RecipeAPI from "../api";

interface Props {
    recipeId: string;
    onClose: () => void;
}
const RecipeModal = ({ recipeId, onClose }: Props) => {
    // create state object to hold the recipe data whenever we call INGREDIENTS endpoint
    const [recipeIngredients, getRecipeInformation] = useState<RecipeIngredients[]>();

    useEffect(() => {
        const fetchRecipeIngredients = async () => {
            try {
                const recipeIngredients = await RecipeAPI.getRecipeInformation(recipeId);
                getRecipeInformation(recipeIngredients.extendedIngredients);
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
                    <div className="modal-content">
                        {recipeIngredients.map((ingredient) => (
                            <h3>{[ingredient.name]}</h3>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeModal;

