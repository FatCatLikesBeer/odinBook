const request = require('supertest');
import express from 'express';
import { signUpRouter } from '../routes/signupRouter';
import sequelize from '../models/SequelizeConnection';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', signUpRouter);

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
})

//// ---- POST REQUESTS ---- ////
const apendage: number = Math.floor(Math.random() * 1000000);
describe('Successfull Signup', () => {
  const agent = request.agent(app);
  let cookie: any;
  it('Sends Unique Signup Info', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        userName: `delete_me_${apendage}`,
        password: 'fakePassword',
        email: `delete_me_${apendage}@me.net`,
      })
      .expect("Content-Type", /json/)
      .expect(200);

    cookie = await loginResponse.get('set-cookie')[0];
    expect(cookie).toBeDefined();
    expect(cookie.split("=")[0]).toMatch('Barer');

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeTruthy();
    expect(parsedResult1.message).toBeDefined();
    expect(parsedResult1.data).not.toBeNull();
  });
});

// ---- POST REQUESTS ---- ////
const apendage1: number = Math.floor(Math.random() * 1000000);
describe('Bad Signups: preexisting', () => {
  const agent = request.agent(app);
  it('Sends pre existing userName', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        userName: `billy`,
        password: 'fakePassword',
        email: `delete_me_${apendage1}@me.net`,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBeDefined();
    expect(parsedResult1.data).toBeNull();
  });

  it('Pre existing email', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        userName: `delete_me_${apendage1}`,
        password: 'fakePassword',
        email: `itisbilly@gmail.com`,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBeDefined();
    expect(parsedResult1.data).toBeNull();
  });
});
