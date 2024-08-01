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
import { jwtProper, userAgent } from './variables';

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

let textPostId: number;
let linkPostId: number;
let imagePostId: number;

// POST Requests
describe("POST requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);
  it("Touches POST endpoint", async () => {
    let response = await agent
      .post('/')
      .expect("Content-Type", /json/)
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
  });

  it("POST text without title", async () => { });
  it("POST text without description", async () => { });
  it("POST text without title & description", async () => { });
  it("POST text without owner id", async () => { });
  it("POST link without title", async () => { });
  it("POST link without description/link/JSON", async () => { });
  it("POST image without title", async () => { });
  it("POST image without description/JSON", async () => { });
  it("Successful text POST", async () => { });
  it("Successful link POST", async () => { });
  it("Successful image POST", async () => { });
});

// GET DETAIL Requests
describe("GET DETAIL requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches GET detail endpoint", async () => {
    let response = await agent
      .get('/1')
      .expect("Content-Type", /json/)
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
  });

  it("GET nonexistent post", async () => { });
  it("Successful GET text post", async () => { });
  it("Successful GET link post", async () => { });
  it("Successful GET image post", async () => { });
});

// GET Requests
describe("GET requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches GET endpoint", async () => {
    let response = await agent
      .get('/')
      .expect("Content-Type", /json/)
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
  });

  it("GET text posts with title query", async () => { });
  it("GET text posts with description query", async () => { });
  it("GET link posts with title query", async () => { });
  it("GET image posts with title query", async () => { });
});

// PUT Requests
describe("PUT requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches PUT endpoint", async () => {
    let response = await agent
      .put('/1')
      .expect("Content-Type", /json/)
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
  });

  it("PUT changes to a text post's title", async () => { });
  it("PUT changes to a text post's description", async () => { });
  it("PUT changes to a image post's title", async () => { });
  it("PUT changes to a image post's description/JSON", async () => { });
  it("PUT changes to a link post's description", async () => { }); // Links can not be edited
  it("PUT changes to a link post's JSON", async () => { }); // Links can not be edited
});

// DELETE Requests
describe("DELETE requests", () => {
  let agent = request.agent(app).set('user-agent', userAgent).set('Cookie', jwtProper);;
  it("Touches DELETE endpoint", async () => {
    let response = await agent
      .delete('/1')
      .expect("Content-Type", /json/)
      .expect(200)

    let parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
  });

  it("DELETE nonexistent post", async () => { });
  it("DELETE existing post", async () => { });
});

// 1) Create a post constructor class
// 1.5) text, link, image
// 2) Text posts will be a regular post
// 2) link posts will have the links in the body of the post
// 2) image posts will have JSON in the body. An array of image locations
