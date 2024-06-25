import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ResponseJSON } from './types';
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
const port = 3001;

app.get('/apiv0', (req: Request, res: Response) => {
  const response: ResponseJSON = {
    success: true,
    message: "You touched the API!",
  }
  res.json(response);
});

app.get('/apiv0/:id', (req: Request, res: Response) => {
  const query: String = req.params.id;
  const response: ResponseJSON = {
    success: true,
    message: `You said '${query}'!`,
  };
  res.json(response);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
