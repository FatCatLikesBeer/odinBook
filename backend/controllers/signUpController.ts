// Import Modules
const bcrypt = require('bcryptjs');
require('dotenv').config();
import { default as asyncHandler } from 'express-async-handler';
import * as jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
// import passport from 'passport';

// Import Types
import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import { ResponseJSON, FailureResponseJSON } from '../types/types';

// Import Models
const UserModel = require('../models/User');

const secret: Secret = process.env.JWT_SECRET as string;

exports.post = [
  body('userName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username character minimum: 3'),

  body('userName')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Username character maximum: 20'),

  body('userName')
    .trim()
    .notEmpty()
    .withMessage('Username must not be empty'),

  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password character minimum: 8'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid Email'),

  // Making My own custom error validation 😃
  // Check if username already exists
  body('userName')
    .trim()
    .custom(async (value) => {
      const existingUser = await UserModel.findOne({ userName: value }).exec();
      if (existingUser) {
        throw new Error('Signup failed. Please check your details and try again.');
      }
    }),

  // Check if email aready in use
  body('email')
    .trim()
    .custom(async value => {
      const existingUser = await UserModel.findOne({ email: value }).exec();
      if (existingUser) {
        throw new Error('Signup failed. Please check your details and try again.');
      }
    }),

  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const [userName, email, password] = [
      req.body.userName,
      req.body.email,
      req.body.password,
    ];

    // Errors From Body Parser
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      const responseError: ResponseJSON = {
        success: false,
        message: errorMessage,
        data: null,
      };
      res.status(400).json(responseError);
    } else {
      // No errors in request body
      try {
        bcrypt.hash(password, 12, async (error: String, hashedPassword: String) => {

          // Create a new user
          const newUser = new UserModel({
            userName: userName,
            password: hashedPassword,
            email: email,
          });

          // Save user
          await newUser.save();

          // Make a JWT Payload
          const payload = {
            _id: newUser._id.toString(),
            userName: userName,
            email: email,
          }

          // Create & Send Payload
          jwt.sign(payload, secret, { expiresIn: '600s' }, (err, token) => {
            if (err) {
              res.status(400).json({
                success: false,
                message: "Error generating token",
              })
            } else {
              // Send data back to client
              res.cookie('Barer', token);
              const response: ResponseJSON = {
                success: true,
                message: "Signup Successful 😃",
                data: {
                  userName: payload.userName,
                  email: payload.email,
                  _id: payload._id,
                },
              }
              res.json(response);
            }
          });
        });
      } catch (err) {
        const responseError: ResponseJSON = {
          success: false,
          message: 'Error signing up',
          data: null,
        }
        res.status(400).json(responseError);
      }
    }
  })
]
