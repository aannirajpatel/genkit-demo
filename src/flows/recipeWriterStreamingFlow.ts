// import the Genkit and Google AI plugin libraries
import { gemini15Flash } from '@genkit-ai/googleai';
import { ai } from './ai';
import { z } from 'genkit';

export const recipeWriterStreamingFlow = ai.defineStreamingFlow(
  {
    name: 'recipeWriterStreamingFlow',
    inputSchema: z.string().describe('The name of the dish you want a recipe for.'),
    outputSchema: z.string().describe('The recipe for the dish.'),
    streamSchema: z.string().describe('The recipe for the dish.'),
  },
  async (dishName,streamingCallback) => {
    const { stream,response } = await ai.generateStream({
      system: 'You are a top chef at a michein star restaurant, think Gordon Ramsay (do not replicate his foul language, though). You are providing an elegant recipe for the dish the user wants to know about.',
      model: gemini15Flash,
      prompt: `Write me a recipe for ${dishName}.`,
    });
    if (streamingCallback) {
      for await (const chunk of stream) {
        // Here, you could process the chunk in some way before sending it to
        // the output stream via streamingCallback(). In this example, we output
        // the text of the chunk, unmodified.
        streamingCallback(chunk.text);
      }
    }
    return (await response).text;
  }
);