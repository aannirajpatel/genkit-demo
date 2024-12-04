// import the Genkit and Google AI plugin libraries
import { gemini15Flash } from '@genkit-ai/googleai';
import { ai } from './ai';


export async function generateGemini15FlashResponse(prompt: string = 'Hello, Gemini!'): Promise<string> {
  // Let's make a generation request to the default set AI model (Gemini 1.5 Flash) using the prompt provided
  // Note that you can also provide a model ID for specific Genkit generate calls, like:
  // ai.generate({ prompt, model: gemini15Pro });
  const { text } = await ai.generate({
    prompt,
    system: 'talk like the terminator',
    model: gemini15Flash,
    config: {
      maxOutputTokens: 400,
      stopSequences: ['<end>', '<fin>'],
      temperature: 1.2,
      topP: 0.4,
      topK: 50,
    }
  });

  return text;
}