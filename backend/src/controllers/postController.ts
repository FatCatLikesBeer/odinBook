// Import Modules
import { Request, Response } from 'express';
import { ResponseJSON } from '../../types/custom/Responses';

// Import Models?

// Post Controller
export const postController: any = {};
postController.get = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: GET not yet implemented",
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

postController.post = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: POST not yet implemented",
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

postController.put = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: PUT not yet implemented",
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

postController.delete = async (req: Request, res: Response) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Posts controller: DELETE not yet implemented",
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
