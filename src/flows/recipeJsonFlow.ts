import { z } from "genkit";
import { ai } from "./ai";
import RecipeSchema from "./recipeSchema";

export const recipeJsonFlow = ai.defineFlow({
    name:'recipeJsonFlow',
    inputSchema: z.string(),
    outputSchema: RecipeSchema,
}, async (dishName:string) => {
    const { output } = await ai.generate({
        system: 'You are a top chef at a michein star restaurant, think Gordon Ramsay (do not replicate his foul language, though). You are providing an elegant recipe for the dish the user wants to know about.',
        prompt: `Write me a recipe for ${dishName}.`,
        output: {
            schema: RecipeSchema,
        }
    });
    if (output ==null){
        throw new Error('Response did not match the expected schema');
    }
    return output;
});