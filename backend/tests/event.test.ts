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

const jwtWithMissingValue = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJtaXNtYXRjaGluZ1VzZXJBZ2VudCIsImlhdCI6MTUxNjIzOTAyMn0.iu19gJPnz7BgvchCuQCaU91C6w_VXaX4v_Bd-yQash4";
const jwtProper = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJKZXN0U3VwZXJ0ZXN0LzAuMCIsImlhdCI6MTUxNjIzOTAyMn0.zQ0xQzl8dF98YYOJ0kwUs7TlUOTeYFM4T6lBuXpaGJg";

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
      .set('Cookie', jwtWithMissingValue)
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
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .expect(200);
  })
});

describe("Missing field values", () => {
  const agent = request.agent(app);
  it("Missing ownerId", async () => {
    const body = new BodyContent({ ownerId: "" });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .send(JSON.stringify(body))
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = response.json();
    expect(parsedResponse.message).toBe("Missing ownerId");
  });

  it("Missing description", async () => {
    const body = new BodyContent({ description: "" });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .send(JSON.stringify(body))
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = response.json();
    expect(parsedResponse.message).toBe("Missing description");
  });

  it("Missing location", async () => {
    const body = new BodyContent({ location: "" });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .send(JSON.stringify(body))
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = response.json();
    expect(parsedResponse.message).toBe("Missing location");
  });

  it("Missing startTime", async () => {
    const body = new BodyContent({ startTime: null });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .send(JSON.stringify(body))
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = response.json();
    expect(parsedResponse.message).toBe("Missing start time");
  });

  it("Missing endTime", async () => {
    const body = new BodyContent({ endTime: null });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .send(JSON.stringify(body))
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = response.json();
    expect(parsedResponse.message).toBe("Missing end time");
  });
});

describe("Successful Post Submission", () => {
  it("Successful Post Submission", async () => {
  });
});

// missing: title, description, location, startTime, endTime

// Successful post submission

// Stuff to make my life easier?
// Maybe?
function today() {
  const result = new Date();
  return result;
}

function tomorrow() {
  const todayObject = today();
  const msInADay = 24 * 60 * 60 * 1000;
  const result = new Date(todayObject.getTime() + msInADay);
  return result;
}

// interface BodyContent {
//   ownerId: string;
//   title: string;
//   description: string;
//   images: string | null;
//   location: string;
//   startTime: Date;
//   endTime: Date;
//   externalLink: string;
//   privacy: string | null;
//   visibility: string | null;
// }

interface UserOptions {
  ownerId?: string;
  title?: string;
  description?: string;
  images?: string | null;
  location?: string;
  startTime?: Date | null;
  endTime?: Date | null;
  externalLink?: string;
  privacy?: string | null;
  visibility?: string | null;
}

class BodyContent {
  ownerId: string;
  title: string;
  description: string;
  images: string | null;
  location: string;
  startTime: Date | null;
  endTime: Date | null;
  externalLink: string;
  privacy: string | null;
  visibility: string | null;

  constructor({ ownerId = "billy", title = "Here is a title", description = "Here is a description", images = null, location = "http://www.example.com", startTime = today(), endTime = tomorrow(), externalLink = "https://www.exampleStore.com", privacy = "public", visibility = "draft" }: UserOptions) {
    this.ownerId = ownerId;
    this.title = title;
    this.description = description;
    this.images = images;
    this.location = location;
    this.startTime = startTime;
    this.endTime = endTime;
    this.externalLink = externalLink;
    this.privacy = privacy;
    this.visibility = visibility;
  }
}

