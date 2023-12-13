import { useEffect, useState } from "react";
import { RecipeIngredients } from "../types";
import * as RecipeAPI from "../api";

interface Props {
    recipeId: string;
    onClose: () => void;
}

const RecipeModal = ({ recipeId, onClose }: Props) => {

    // create state object to hold the recipe data whenever we call summary endpoint
    const [recipeSummary, getRecipeIngredients] = useState<RecipeIngredients>();

    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {

                const recipeIngredients = await RecipeAPI.getRecipeIngredients(recipeId);
                getRecipeIngredients(recipeIngredients);

            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipeSummary();
    }, [recipeId]);

    if (!recipeSummary) {
        return <></>
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">

                        <h2>{recipeSummary?.name}</h2>
                        {/* closes the modal: */}
                        <span className="close-btn" onClick={onClose}> &times; </span>
                    </div>

                    <p> {recipeSummary?.image} </p>
                </div>
            </div>
        </>
    );
};

export default RecipeModal;

