// Import Modules
require('dotenv').config();
const bcrypt = require('bcryptjs');
import { Request, Response, NextFunction } from 'express';
import { ResponseJSON } from '../types/Responses';
import * as jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

// Import Models?
import { User } from '../models/User';
import { exists } from 'fs';

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
      // If errors exist
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        throw new Error(errorMessage);
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        throw new Error('Email or password is incorrect');
      }

      const match = await bcrypt.compare(password, existingUser.dataValues.password);
      if (!match) {
        throw new Error('Email or password is incorrect');
      }

      const userAgent = req.headers['user-agent'];
      const id: string = existingUser.dataValues.id;
      const payload = { userAgent, id };

      const response: ResponseJSON = {
        success: true,
        message: "Login Successful",
        data: {}
      }

      jwt.sign(payload, jwtSecret, { expiresIn: '600s' }, (err, token) => {
        if (err) {
          throw new Error(String(err));
        }

        console.log(token);
        res.cookie("Bearer", token).json(response);
        next();
      });
    } catch (error) {
      const failureResponse: ResponseJSON = {
        success: false,
        message: String(error),
        data: null,
      }
      res.status(400).json(failureResponse);
    }
  },
];
