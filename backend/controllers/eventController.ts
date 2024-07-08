// Import Modules
import { Request, Response } from 'express';
import { ResponseJSON } from '../types/Responses';

// Import Models?

// Event Controller
export const eventController: any = {};
eventController.get = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Events controller: GET not yet implemented",
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

eventController.post = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Events controller: POST not yet implemented",
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

eventController.put = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Events controller: PUT not yet implemented",
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

eventController.delete = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Events controller: DELETE not yet implemented",
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
