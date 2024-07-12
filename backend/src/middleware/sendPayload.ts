import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export const sendPayload = (req: Request, res: Response) => {
  const errorFlag = req.error || 'undefined';
  const response = req.response;

  if (errorFlag != 'undefined') {
    res.status(errorFlag).json(response);
    return;
  }

  const payload = req.tokenPayload;
  const secret = String(process.env.JWT_SECRET);

  // Generate token and send this stuff off!
  jwt.sign(payload, secret, { expiresIn: '10w' }, (err, token) => {
    if (err) {
      console.error("Error generating token", err);
      res.json({
        success: false,
        message: 'Error generating authentication data',
      });
    } else {
      res.cookie('Bearer', token, {
        httpOnly: true,
        sameSite: 'strict'
      });
      response.success = true;
      res.json(response);
    }
  });
};
