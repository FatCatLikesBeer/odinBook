require('dotenv').config();
const request = require('supertest');
import express from 'express';
import cookieParser from 'cookie-parser';
import { logInRouter } from '../src/routes/loginRouter';
import { sendPayload } from '../src/middleware/sendPayload';
import sequelize from '../src/models/SequelizeConnection';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', logInRouter, sendPayload);

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
})

const accountPassword: string = String(process.env.ACCPASSWORD);

// Successful Login
describe('Successfull Login', () => {
  const agent = request.agent(app);
  let cookie: any;
  it('Proper values', async () => {
    const loginResponse = await agent
      .post('/')
      .set('User-Agent', 'JestSupertest/0.0')
      .send({
        email: 'itisbilly@gmail.com',
        password: accountPassword,
      })
      .expect("Content-Type", /json/)
      .expect(200);

    cookie = await loginResponse.get('set-cookie')[0];
    expect(cookie).toBeDefined();
    expect(cookie.split("=")[0]).toMatch('Bearer');

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeTruthy();
    expect(parsedResult1.message).toBe('Login Successful');
    expect(parsedResult1.data).not.toBeNull();
  });
});

describe('Bad values', () => {
  const agent = request.agent(app);
  it('Incorrect email', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        email: 'itisbilly@gmail.csldkjfwoieurom',
        password: accountPassword,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBe('Error: Email or password is incorrect');
    expect(parsedResult1.data).toBeNull();
  });

  it('Incorrect password', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        email: 'itisbilly@gmail.com',
        password: `${accountPassword}lsiekdjf`,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBe('Error: Email or password is incorrect');
    expect(parsedResult1.data).toBeNull();
  });

  it('Incorrect email & password', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        email: 'itisbilly@gmail.csldkjfwoieurom',
        password: `${accountPassword}lsiekdjf`,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBe('Error: Email or password is incorrect');
    expect(parsedResult1.data).toBeNull();
  });
});

describe('Missing values', () => {
  const agent = request.agent(app);
  it('Missing email', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        password: accountPassword,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBe('Error: Email must not be empty');
    expect(parsedResult1.data).toBeNull();
  });

  it('Missing password', async () => {
    const loginResponse = await agent
      .post('/')
      .send({
        email: 'itisbilly@gmail.com',
      })
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBe('Error: Password must not be empty');
    expect(parsedResult1.data).toBeNull();
  });

  it('Missing email & password', async () => {
    const loginResponse = await agent
      .post('/')
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    const parsedResult1 = await JSON.parse(loginResponse.text);
    expect(parsedResult1.success).toBeFalsy();
    expect(parsedResult1.message).toBe('Error: Email must not be empty');
    expect(parsedResult1.data).toBeNull();
  });
});

