# Firebase Genkit demo

This document will guide you through the steps to set up a Typescript server that exposes two endpoints - the first one leverages Firebase Genkit to first generate a random name, and the second endpoint is a tool-calling agent that uses the given expression to call the apt math tool.

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

See future commits for the rest of the guide.