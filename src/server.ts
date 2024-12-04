import 'dotenv/config';
import express from 'express';
import { marked } from 'marked';
import { generateGemini15FlashResponse, recipeJsonFlow, recipeWriterFlow, recipeWriterStreamingFlow } from './flows';

const app = express();
const port = 3000;

app.get('/api/v1/hello_world', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/genkit_hello_world', async (req, res) => {
    res.send(marked(await generateGemini15FlashResponse(req.query.prompt as string)));
});

app.get('/api/v1/recipes/ramsey', async (req, res) => {
    res.send(marked(await recipeWriterFlow(req.query.dishName as string ?? 'fish and chips')));
});

app.get('/api/v1/recipes/streaming_ramsey', async (req, res) => {
  const {stream} = recipeWriterStreamingFlow(req.query.dishName as string ?? 'fish and chips');
  for await (const chunk of stream) {
    res.write(chunk);
  }
  res.end();
});

app.get('/api/v1/recipes/json', async (req, res) => {
    res.send(await recipeJsonFlow(req.query.dishName as string ?? 'fish and chips'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log("Hello World endpoint: http://localhost:3000/api/v1/hello_world");
  console.log("Genkit Hello World endpoint: http://localhost:3000/api/v1/genkit_hello_world");
  console.log("Write Recipe endpoint: http://localhost:3000/api/v1/recipes/ramsey?dishName=fish+and+chips");
  console.log("Write Recipe (Streaming) endpoint: http://localhost:3000/api/v1/recipes/streaming_ramsey?dishName=fish+and+chips");
  console.log("Write Recipe JSON endpoint: http://localhost:3000/api/v1/recipes/json?dishName=fish+and+chips");
});
