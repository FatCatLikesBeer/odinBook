//// post.test.tst
// Import packages
require('dotenv').config();
const request = require('supertest');
import express from 'express';
import cookieParser from 'cookie-parser';
import { postRouter } from '../src/routes/postRouter';
import { browserChecker } from '../src/middleware/browserChecker';
import { sendPayload } from '../src/middleware/sendPayload';
import sequelize from '../src/models/SequelizeConnection';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', browserChecker, postRouter, sendPayload);

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});

// Browser Header Settings
const jwtProper = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJKZXN0U3VwZXJ0ZXN0LzAuMCIsImlkIjoiMSIsImlhdCI6MTUxNjIzOTAyMn0.z5VDf_c0XOD9hvvsypqlyCqn1_NYVXHRbCb3sIQcc0Q";
const userAgent = 'JestSupertest/0.0';

// POST Requests
describe("POST requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);
  it("Touches POST endpoint", async () => {
    let response = await agent
      .post('/')
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    console.log(parsedResponse.message);
  });
});

// GET DETAIL Requests
describe("GET DETAIL requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches GET detail endpoint", async () => {
    let response = await agent
      .get('/1')
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    console.log(parsedResponse.message);
  });
});

// GET Requests
describe("GET requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches GET endpoint", async () => {
    let response = await agent
      .get('/')
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    console.log(parsedResponse.message);
  });
});

// PUT Requests
describe("PUT requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches PUT endpoint", async () => {
    let response = await agent
      .put('/1')
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    console.log(parsedResponse.message);
  });
});

// DELETE Requests
describe("DELETE requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches DELETE endpoint", async () => {
    let response = await agent
      .delete('/1')
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    console.log(parsedResponse.message);
  });
});
