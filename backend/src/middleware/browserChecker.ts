// browserChecker.ts
// Checks if a 'user-agent' is present in headers

import { Request, Response, NextFunction } from 'express';
import { sendPayload } from './sendPayload';

export function browserChecker(req: Request, res: Response, next: NextFunction) {
  if (
    String(req.headers['user-agent']) == 'null'
    ||
    String(req.headers['user-agent']) == 'undefined'
  ) {
    req.error = 401;
    req.response = {
      success: false,
      message: "Missing user-agent",
    }
    sendPayload(req, res);
  } else {
    next();
  }
}
