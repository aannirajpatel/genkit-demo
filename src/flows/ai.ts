import googleAI, { gemini15Flash } from "@genkit-ai/googleai";
import { genkit } from "genkit";

export const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});

export const recipeWriterPrompt = ai.prompt('recipeWriterPrompt');