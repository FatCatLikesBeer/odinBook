import { Request, Response, NextFunction } from 'express';
import * as asyncHandler from "express-async-handler";
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

const sendPayload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Parse out payload
  const payload = req.tokenData;

  // Parse out response
  const response = req.response;

  // Error flag
  const errorFlag = req.error || 'undefined';

  // Generate token and send this stuff off!
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10w' }, (err, token) => {
    if (err) {
      console.error("Error generating token", err);
      res.json({
        success: false,
        message: 'Error generating authentication data',
      });
    } else {
      res.cookie('Barer', token, {
        httpOnly: true,
        sameSite: 'Strict'
      });
      response.userData = {
        _id: req.tokenData._id.toString(),
        userName: req.tokenData.userName,
        email: req.tokenData.email,
      }
      response.userName = req.tokenData.userName;
      if (errorFlag != 'undefined') {
        response.success = false;
        res.status(errorFlag).json(response);
      } else {
        response.success = true;
        res.json(response);
      }
    }
  });
});

module.exports = sendPayload;
