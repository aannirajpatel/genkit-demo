// import the Genkit and Google AI plugin libraries
import { ai, recipeWriterPrompt } from './ai';

export const recipeWriterFlow = ai.defineFlow(
  {
    name: 'recipeWriterFlow',
  },
  async (dishName) => {
    // const { text } = await ai.generate({
    //   system: 'You are a top chef at a michein star restaurant, think Gordon Ramsay (do not replicate his foul language, though). You are providing an elegant recipe for the dish the user wants to know about.',
    //   model: gemini15Flash,
    //   prompt: `Write me a recipe for ${dishName}.`,
    // });
    const {text} = await recipeWriterPrompt({dishName});
    return text;
  }
);