// Import Modules
import { Request, Response, NextFunction } from 'express';
import { ResponseJSON } from '../../types/custom/Responses';

import { fuzzifyQuery } from '../functions/fuzzifyQuery';

// Import Models?

export const postController: any = {};
postController.detail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: GET detail not yet implemented",
      data: {}
    }
    req.response = response;
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 418;
    req.response = failureResponse;
  }
  next();
}

postController.get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: GET list not yet implemented",
      data: {}
    }
    req.response = response;
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 418;
    req.response = failureResponse;
  }
  next();
}

postController.post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: POST not yet implemented",
      data: {}
    }
    req.response = response;
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 418;
    req.response = failureResponse;
  }
  next();
}

postController.put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: PUT not yet implemented",
      data: {}
    }
    req.response = response;
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 418;
    req.response = failureResponse;
  }
  next();
}

postController.delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: DELETE not yet implemented",
      data: {}
    }
    req.response = response;
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 418;
    req.response = failureResponse;
  }
  next();
}
