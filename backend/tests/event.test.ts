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
    await agent
      .post('/')
      .expect("Content-Type", /json/)
      .expect(401);
  });

  it("Lacking 'Bearer'", async () => {
    await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .expect("Content-Type", /json/)
      .expect(401);
  });

  it("Lacking valid token", async () => {
    await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', "Bearer=invalidJWT")
      .expect("Content-Type", /json/)
      .expect(401);
  });

  it("Lacking userAget", async () => {
    await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJtaXNtYXRjaGluZ1VzZXJBZ2VudCIsImlhdCI6MTUxNjIzOTAyMn0.iu19gJPnz7BgvchCuQCaU91C6w_VXaX4v_Bd-yQash4")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("Successful post submission", () => {
  const agent = request.agent(app);
  it("Successful post submission", async () => {
    await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', 'Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJKZXN0U3VwZXJ0ZXN0LzAuMCIsImlhdCI6MTUxNjIzOTAyMn0.zQ0xQzl8dF98YYOJ0kwUs7TlUOTeYFM4T6lBuXpaGJg')
      .expect("Content-Type", /json/)
      .expect(200);
  })
});

describe("Missing field values", () => {
  const agent = request.agent(app);
  it("Missing ownerID", async () => {
  });

  it("Missing description", async () => {
  });

  it("Missing location", async () => {
  });

  it("Missing startTime", async () => {
  });

  it("Missing endTime", async () => {
  });
});

describe("Successful Post Submission", () => {
  it("Successful Post Submission", async () => {
  });
});

// missing: title, description, location, startTime, endTime

// Successful post submission
