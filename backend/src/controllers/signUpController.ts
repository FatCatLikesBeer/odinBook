// Import Modules
const bcrypt = require('bcryptjs');
require('dotenv').config();
import { default as asyncHandler } from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';

// Import Types
import { Request, Response, NextFunction } from 'express';
import { Secret } from 'jsonwebtoken';
import { ResponseJSON } from '../../types/custom/Responses';

// Import Models
import { User } from '../models/User';

const secret: Secret = process.env.JWT_SECRET as string;

export const signUpController: any = {};

signUpController.post = [
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
      const existingUser = await User.findOne({ where: { userName: value } });
      if (existingUser) {
        throw new Error('Signup failed. Please check your details and try again.');
      }
    }),

  // Check if email aready in use
  body('email')
    .trim()
    .custom(async value => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('Signup failed. Please check your details and try again.');
      }
    }),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const [userName, email, password] = [
      req.body.userName,
      req.body.email,
      req.body.password,
    ];

    // Handle errors from body parser
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      req.response = {
        success: false,
        data: null,
        message: errorMessage
      }
      req.error = 400;
      next();
    } else {
      // No errors in request body
      try {
        // Check user-agent
        // Throw new error if no user-agent
        const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : "unknownBrowser";
        if (userAgent == "unknownBrowser") {
          throw new Error("Unknown Browser");
        }
        bcrypt.hash(password, 12, async (_error: String, hashedPassword: String) => {

          // Create a new user
          const newUser = User.build({
            userName: userName,
            displayName: userName,
            password: hashedPassword,
            email: email,
          });

          // Save user
          await newUser.save();

          const response: ResponseJSON = {
            success: true,
            message: "Signup Successful 😃",
            data: {
              userData: {
                userName: newUser.dataValues.userName,
                displayName: newUser.dataValues.userName,
                email: newUser.dataValues.email,
                id: newUser.dataValues.id,
              }
            }
          }

          req.response = response;
          req.tokenPayload = {
            id: newUser.dataValues.id,
            userAgent
          }
          next();
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
