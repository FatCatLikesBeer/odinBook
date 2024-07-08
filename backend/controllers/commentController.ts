// Import Modules
import { Request, Response } from 'express';
import { ResponseJSON } from '../types/Responses';

// Import Models?

// Comment Controller
export const commentController: any = {};
commentController.get = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Comments controller: GET not yet implemented",
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

commentController.post = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Comments controller: POST not yet implemented",
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

commentController.put = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Comments controller: PUT not yet implemented",
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

commentController.delete = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Comments controller: DELETE not yet implemented",
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
