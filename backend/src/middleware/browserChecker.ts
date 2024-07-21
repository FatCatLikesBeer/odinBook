// browserChecker.ts
// Checks if a 'user-agent' is present in headers

require('dotenv').config();
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { sendPayload } from './sendPayload';

const JWTsecret: string = String(process.env.JWT_SECRET);

export function browserChecker(req: Request, res: Response, next: NextFunction) {
  // Does your browser have a user-agent?
  if (String(req.headers['user-agent']) == 'null' || String(req.headers['user-agent']) == 'undefined') {
    req.error = 401;
    req.response = {
      success: false,
      message: 'Missing user-agent',
    }
    sendPayload(req, res);
    return;
  }

  // The following does not matter for signups or login
  if (req.baseUrl != "/apiv0/signup" && req.baseUrl != "/apiv0/login") {
    // Pre defining an error message defensively
    req.error = 401;
    req.response = {
      success: false,
      message: 'Bad or nonexistent token',
    }

    // Did your browser bring a cookie?
    const cookie: string | undefined = req.cookies.Bearer;
    if (cookie == undefined) {
      sendPayload(req, res);
      return;
    }

    // Is that cookie a valid JWT?
    let userAgentFromToken: string | undefined = undefined;
    let errorFromTokenVerification: string | undefined = undefined;
    let idFromToken: string = "I need this here to make TypeScript happy. I will go away if there are any problems";

    jwt.verify(String(cookie), JWTsecret, (error: any, tokenData: any) => {
      if (error) {
        errorFromTokenVerification = error;
      }
      userAgentFromToken = tokenData?.userAgent;
      idFromToken = tokenData?.id;
    });

    if (errorFromTokenVerification != undefined) {
      sendPayload(req, res);
      return;
    }

    // Does the JWT have an userAgent property?
    if (userAgentFromToken == undefined) {
      sendPayload(req, res);
      return;
    }

    // Does the agent match your browser?
    if (userAgentFromToken != req.headers['user-agent']) {
      sendPayload(req, res);
      return;
    }

    req.tokenPayload = {
      id: String(idFromToken),
      userAgent: String(req.headers['user-agent'])
    };

    // Your stuff appears to be valid!
    // Remove defensive message
    req.error = undefined;
    req.response = undefined;
  }

  // You may procede!
  next();
}
