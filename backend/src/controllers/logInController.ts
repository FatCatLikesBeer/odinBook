// Import Modules
require('dotenv').config();
const bcrypt = require('bcryptjs');
import { Request, Response, NextFunction } from 'express';
import { ResponseJSON } from '../../types/custom/Responses';
import * as jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

// Import Models?
import { User } from '../models/User';

// logIn Controller
export const logInController: any = {};

const jwtSecret: string = String(process.env.JWT_SECRET);

logInController.post = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email must not be empty'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must not be empty'),

  body('email')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Email or password is incorrect'),

  body('email')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Email or password is incorrect'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Email or password is incorrect'),

  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Email or password is incorrect'),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // If errors exist from body validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        throw new Error(errorMessage);
      }

      // Check for existing user
      // Throw error if no user found
      const { email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        throw new Error('Email or password is incorrect');
      }

      // Compare user password w/provided password
      // Throw error if passwords don't match
      const match = await bcrypt.compare(password, existingUser.dataValues.password);
      if (!match) {
        throw new Error('Email or password is incorrect');
      }

      // Check user-agent: used in token
      // Throw new error if no user-agent
      const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : "unknownBrowser";
      if (userAgent == "unknownBrowser") {
        throw new Error("Unknown Browser");
      }

      // Construct success response
      const id: string = existingUser.dataValues.id;
      const payload = { userAgent, id };

      const response: ResponseJSON = {
        success: true,
        message: "Login Successful",
      }

      req.tokenPayload = payload
      req.response = response
      next();
    } catch (error) {
      req.error = 400;
      req.response = {
        success: false,
        message: String(error),
        data: null,
      }
      next();
    }
  },
];
