// creating a TS type which will contain all the properties that an Recipe object will have

export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    usedIngredientCount: number;
}

export interface RecipeIngredients {
    name: string;
    image: string;
    unit: string;
    amount: number;
}[];

export interface RecipeInstructions {
    step: string;
}[];

export interface RecipeInfo {
    ingredients: RecipeIngredients;
    instructions: RecipeInstructions;
}

export interface Limit {
    message: string;
}

