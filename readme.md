# Firebase Genkit demo

This document will guide you through the steps to set up a Typescript server that exposes two endpoints - the first one leverages Firebase Genkit to first expose an endpoint that does generation based on user prompt in the voice of the Terminator, and next exposes several endpoints that show off Genkit's capabilities around schema-based generation, streaming, and more.

Requirements:
- A computer with Node.js (v20+) installed (visit https://nodejs.org/ to download and install Node.js).
- A code editor (e.g., Visual Studio Code preferred)
- Access to the terminal (any of cmd, powershell, bash, zsh, etc.)
- Access to the internet

## 1. Setting up the Node/Typescript server

1. Create a new directory and navigate to it.
2. Run `npm init -y` to create a new package.json file.
3. Install typescript, nodemon and ts-node as development dependencies, and express as a production dependency:
```bash
npm install express
npm install --save-dev typescript ts-node nodemon @types/express
```

4. Run `npx tsc --init` to create a tsconfig.json file.
5. Create a new directory named `src` and navigate to it.
6. Create a new file named `server.ts` and add the following code (no genkit yet, we will create a hello world server first):
```typescript
import express from 'express';

const app = express();
const port = 3000;

app.get('/api/v1/hello_world', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`, 'visit http://localhost:3000/api/v1/hello_world to see the response');
});
```

7. Navigate back to the root directory and run `npx nodemon src/server.ts` to start the server.
8. Open your browser and navigate to `http://localhost:3000/api/v1/hello_world` to see the response.
9. You have successfully set up a Typescript server! To check-in changes to git, remember to add a gitignore. You can simply run `npx gitignore node` to create a node gitignore file.

## 2. Setting up Firebase Genkit

1. Sign up on https://aistudio.google.com and visit https://aistudio.google.com/app/apikey to get an API key. You may be asked to create a Google Cloud project with billing enabled, first, to get the API key.
2. Place the key in a `.env` file in the root directory of this project as `GOOGLE_GENAI_API_KEY=<your_api_key_here>`.
3. Install the Firebase Genkit package and its Google AI plugin:
```bash
npm install genkit @genkit-ai/googleai
```
4. Now we can define a new endpoint that uses Firebase Genkit to respond to user prompts:

File: `src/generateGemini15FlashResponse.ts`
```ts
// import the Genkit and Google AI plugin libraries
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // set default model
});

export async function generateGemini15FlashResponse(prompt: string = 'Hello, Gemini!'): Promise<string> {
  // make a generation request
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
}
```

File: `src/server.ts`
```ts
import express from 'express';
import { generateGemini15FlashResponse } from './generateGemini15FlashResponse';

const app = express();
const port = 3000;

app.get('/api/v1/generate_gemini15_flash', async (req, res) => {
  res.send(await generateGemini15FlashResponse(req.query.prompt as string));
});
```

## 3. Setting up a Genkit flow

1. Create a new file `src/recipeWriterFlow.ts` and add the following code:
```ts
// import the Genkit and Google AI plugin libraries
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // set default model
});

export const recipeWriterFlow = ai.defineFlow(
  {
    name: 'recipeWriterFlow',
  },
  async (dishName) => {
    const { text } = await ai.generate({
      system: 'You are a top chef at a michein star restaurant, think Gordon Ramsay (do not replicate his foul language, though). You are providing an elegant recipe for the dish the user wants to know about.',
      model: gemini15Flash,
      prompt: `Write me a recipe for ${dishName}.`,
    });
    return text;
  }
);
```

Update file `src/server.ts` as follows:
```ts
import express from 'express';
import { generateGemini15FlashResponse } from './generateGemini15FlashResponse';
import { recipeWriterFlow } from './recipeWriterFlow';

...


app.get('/api/v1/recipe_writer', async (req, res) => {
  res.send(await recipeWriterFlow(req.query.dishName as string));
});

...
```

2. Now try the flow out first using genkit-cli:
```bash
npm install genkit-cli --save-dev
npx genkit-cli start npm run serve:dev
```