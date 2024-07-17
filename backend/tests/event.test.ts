// Import packages
require('dotenv').config();
const request = require('supertest');
import express from 'express';
import cookieParser from 'cookie-parser';
import { eventRouter } from '../src/routes/eventRouter';
import { browserChecker } from '../src/middleware/browserChecker';
import { sendPayload } from '../src/middleware/sendPayload';
import sequelize from '../src/models/SequelizeConnection';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', browserChecker, eventRouter, sendPayload);

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
})

const accountPassword: string = String(process.env.ACCPASSWORD);

// Import FULL route for Events

//////
// Tests:
//////

// Lacking user-agent
describe("Lacking browser & token stuff", () => {
  const agent = request.agent(app);
  let cookie: any;
  it("Lacking cookies", async () => {
    const response = await agent
      .post('/')
      .expect("Content-Type", /json/)
      .expect(401);
  });
});
// Lacking cookies
// Lacking Bearer
// Invalid token
// Lacking token.userAgent

// Missing ownerId
// Missing/unselected type
// Missing title based on selected type

// Successful post submission
