// creating a TS type which will contain all the properties that an Recipe object will have

export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    usedIngredientCount: number
}