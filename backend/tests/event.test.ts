// Import packages
require('dotenv').config();
const request = require('supertest');
import express from 'express';
import cookieParser from 'cookie-parser';
import { eventRouter } from '../src/routes/eventRouter';
import { browserChecker } from '../src/middleware/browserChecker';
import { sendPayload } from '../src/middleware/sendPayload';
import sequelize from '../src/models/SequelizeConnection';
import { encode } from 'punycode';
import { parse } from 'path';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', browserChecker, eventRouter, sendPayload);

let eventIdOfEventToBeDeleted: number;

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
})

const accountPassword: string = String(process.env.ACCPASSWORD);

const jwtWithMissingValue = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJtaXNtYXRjaGluZ1VzZXJBZ2VudCIsImlhdCI6MTUxNjIzOTAyMn0.iu19gJPnz7BgvchCuQCaU91C6w_VXaX4v_Bd-yQash4";
const jwtProper = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJKZXN0U3VwZXJ0ZXN0LzAuMCIsImlkIjoiMSIsImlhdCI6MTUxNjIzOTAyMn0.z5VDf_c0XOD9hvvsypqlyCqn1_NYVXHRbCb3sIQcc0Q";

describe("Lacking browser & token stuff", () => {
  const agent = request.agent(app);
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

describe("Missing field values", () => {
  const agent = request.agent(app);
  it("Missing ownerId", async () => {
    const body = new BodyContent({ ownerId: "" });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(body)
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toBe("Error: Invalid ownerId.");
  });

  it("Missing description", async () => {
    const body = new BodyContent({ description: "" });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(body)
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toBe("Error: Invalid description.");
  });

  it("Missing location", async () => {
    const body = new BodyContent({ location: "" });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(body)
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toBe("Error: Invalid location.");
  });

  it("Missing startTime", async () => {
    const body = new BodyContent({ startTime: null });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(body)
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toBe("Error: Invalid start time.");
  });

  it("Missing endTime", async () => {
    const body = new BodyContent({ endTime: null });
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(body)
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toBe("Error: Invalid end time.");
  });
});

describe("Unsuccessful API queries", () => {
  const agent = request.agent(app);
  it("Fetch event from nonexistent eventId", async () => {
    const response = await agent
      .get('/badId')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .expect(401);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeFalsy();
    expect(parsedResponse.message).toMatch("Incorrect event ID");
  });
});

// describe("GET Requests", () => {
//   const agent = request.agent(app);
//   it("Request Event via Title: Event does not exist", async () => {
//     const queryObject = {
//       title: "slkdjflksoweiurilsdkf"
//     }
//     const queryString = queryToURLEncoded(queryObject);
//     const response = await agent
//       .get(queryString)
//       .set('user-agent', 'JestSupertest/0.0')
//       .set('Cookie', jwtProper)
//       .expect("Content-Type", /json/)
//       .expect(200);
//
//     const parsedResponse = JSON.parse(response.text);
//     expect(parsedResponse.message).toBe("No Events Found");
//     expect(parsedResponse.success).toBeTruthy();
//     expect(parsedResponse.data).toBeNull();
//   });
// });

describe("Successful API requests", () => {
  const agent = request.agent(app);
  it("Successful post submission", async () => {
    let body = new BodyContent({});
    const response = await agent
      .post('/')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(body)
      .expect("Content-Type", /json/)
      .expect(200);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toBe("Event: Created");
    expect(parsedResponse.success).toBeTruthy();
    eventIdOfEventToBeDeleted = parsedResponse.data.id;
  });

  // it("Successful Event Detail fetch", async () => {
  //   const response = await agent
  //     .get('/1')
  //     .set('user-agent', 'JestSupertest/0.0')
  //     .set('Cookie', jwtProper)
  //     .expect("Content-Type", /json/)
  //     .expect(200);
  //
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.message).toBe("Event: Detail for eventId: 1");
  //   expect(parsedResponse.success).toBeTruthy();
  // });
  //
  // it("Multiple query parameters", async () => {
  //   const query = {
  //     title: "gender",
  //     description: "clown",
  //     location: "line",
  //   }
  //   const queryString = queryToURLEncoded(query);
  //   const response = await agent
  //     .get(queryString)
  //     .set('user-agent', 'JestSupertest/0.0')
  //     .set('Cookie', jwtProper)
  //     .expect("Content-Type", /json/)
  //     .expect(200);
  //
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.success).toBeTruthy();
  //   expect(parsedResponse.message).toMatch("Event: found 1 event(s)");
  //   expect(parsedResponse.data[0].title).toBe("Gender Reveal");
  //   expect(parsedResponse.data[0].description).toMatch(/clown/);
  // });
});

describe("DELETE Requests", () => {
  const agent = request.agent(app);
  it("Successful Event Deletion", async () => {
    const response = await agent
      .delete(`/${eventIdOfEventToBeDeleted}`)
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .expect(200)

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    expect(parsedResponse.message).toMatch("Event: Deleted");
  });

  it("Delete nonexistent event", async () => {
    const response = await agent
      .delete('/what')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect("Content-Type", /json/)
      .expect(400)

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeFalsy();
    expect(parsedResponse.message).toMatch(/Event: Error deleting/);
  });
});

describe("PUT Requests", () => {
  const agent = request.agent(app);
  let eventObject: any;
  it("GET event to edit", async () => {
    const response = await agent
      .get('/1')
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .expect('Content-Type', /json/)
      .expect(200)

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeTruthy();
    expect(parsedResponse.data).not.toBeNull();

    eventObject = parsedResponse.data;
  });

  it("Nonexistent onwer ID", async () => {
    const localEventObject: any = { ...eventObject };
    const path = localEventObject.id;
    localEventObject.ownerId = "";
    const response = await agent
      .put(`/${path}`)
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(localEventObject)
      .expect('Content-Type', /json/)
      .expect(400)

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeFalsy();
    expect(parsedResponse.message).toMatch(/Event: Bad PUT request: owner Id/);
    expect(parsedResponse.data).toBeNull();
  });

  it("Empty Title", async () => {
    const localEventObject: any = { ...eventObject };
    const path = localEventObject.id;
    localEventObject.title = "";
    const response = await agent
      .put(`/${path}`)
      .set('user-agent', 'JestSupertest/0.0')
      .set('Cookie', jwtProper)
      .send(localEventObject)
      .expect('Content-Type', /json/)
      .expect(400)

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.success).toBeFalsy();
    expect(parsedResponse.message).toMatch(/Event: Bad PUT request: title/);
    expect(parsedResponse.data).toBeNull();
  });

  // it("Conflicting eventID", async () => {
  //   const localEventObject: any = { ...eventObject };
  //   const path = localEventObject.id;
  //   localEventObject.id = "2";
  //   const response = await agent
  //     .put(`/${path}`)
  //     .set('user-agent', 'JestSupertest/0.0')
  //     .set('Cookie', jwtProper)
  //     .send(localEventObject)
  //     .expect('Content-Type', /json/)
  //     .expect(400)
  //
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.success).toBeFalsy();
  //   expect(parsedResponse.message).toMatch(/Event: Bad PUT request: id/);
  //   expect(parsedResponse.data).toBeNull();
  // });
  //
  // it("Empty Event Id", async () => {
  //   const localEventObject: any = { ...eventObject };
  //   localEventObject.id = "";
  //   const response = await agent
  //     .put('/1')
  //     .set('user-agent', 'JestSupertest/0.0')
  //     .set('Cookie', jwtProper)
  //     .send(localEventObject)
  //     .expect('Content-Type', /json/)
  //     .expect(400)
  //
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.success).toBeFalsy();
  //   expect(parsedResponse.message).toMatch(/Event: Bad PUT request: id/);
  //   expect(parsedResponse.data).toBeNull();
  // });

  // it("Successful change", async () => {
  //   const localEventObject: any = { ...eventObject };
  //   const path = localEventObject.id;
  //   let title = localEventObject.title.split(" ");
  //   title[title.length - 1] = title[title.length - 1] * 1 + 1;
  //   localEventObject.title = title.join(" ");
  //   const response = await agent
  //     .put(`/${path}`)
  //     .set('user-agent', 'JestSupertest/0.0')
  //     .set('Cookie', jwtProper)
  //     .send(localEventObject)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.success).toBeTruthy();
  //   expect(parsedResponse.message).toMatch(/Event: Change Successful/);
  //   expect(parsedResponse.data).not.toBeNull();
  // });
});

// describe("SQL Injection", () => {
//   const agent = request.agent(app);
//   it("Inject a SELECT query", async () => {
//     const query = {
//       title: "SELECT * FROM Events",
//     }
//     const queryString = queryToURLEncoded(query);
//     const response = await agent
//       .get(queryString)
//       .set('user-agent', 'JestSupertest/0.0')
//       .set('Cookie', jwtProper)
//
//     const parsedResponse = JSON.parse(response.text);
//     expect(parsedResponse.data).toBeNull();
//   });
// });

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

  constructor({ ownerId = "1", title = "Here is a title", description = "Here is a description", images = null, location = "Los Angeles", startTime = today(), endTime = tomorrow(), externalLink = "https://www.exampleStore.com", privacy = "public", visibility = "draft" }: UserOptions) {
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

function queryToURLEncoded(queryParameters: any) {
  let result = Object.entries(queryParameters)
    .map(([key, value]) => { return `${encodeURIComponent(String(key))}=${encodeURIComponent(String(value))}` })
    .join('&');
  result = "/?" + result;
  return result;
}
