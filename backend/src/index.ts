// Import Modules & Types
import express from 'express';
import cookieParser from 'cookie-parser';

// Import Routes & Controllers
import { apiRouter } from "./routes/apiRouter";

// Pre App Config
require('dotenv').config();
const logger = require('morgan');

// Post App Config
const app = express();
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3001;

// Routes Declaration
app.use('/apiv0', apiRouter);

// Run API Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
