import express from 'express';

const app = express();
const port = 3000;

app.get('/api/v1/hello_world', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`, 'visit http://localhost:3000/api/v1/hello_world to see the response');
});
