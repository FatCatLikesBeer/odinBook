// Import Modules
import { Request, Response } from 'express';
import { ResponseJSON } from '../types/Responses';

// Import Models?

// logIn Controller
export const logInController: any = {};
logInController.post = async (req: Request, res: Response) => {
  // 1: use express body parser to check for form errors
  // 2: If form data is fine, query database for userNames & email conflict
  // 3: if none, then success
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Login Controller not yet implemented",
      data: {}
    }
    res.json(response);
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    res.json(failureResponse);
  }
}
