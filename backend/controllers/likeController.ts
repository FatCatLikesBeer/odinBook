// Import Modules
import { Request, Response } from 'express';
import { ResponseJSON } from '../types/Responses';

// Import Models?

// Like Controller
export const likeController: any = {};
likeController.get = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Likes controller: GET not yet implemented",
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

likeController.post = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Likes controller: POST not yet implemented",
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

likeController.put = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Likes controller: PUT not yet implemented",
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

likeController.delete = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Likes controller: DELETE not yet implemented",
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
