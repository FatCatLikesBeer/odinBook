import { Router, Request, Response } from "express";
import { ResponseJSON } from "../types/Responses";
import { signUpRouter } from "./signupRouter";

export const apiRouter = Router();

apiRouter.get('/', index);
apiRouter.use('/signup', signUpRouter);
apiRouter.get('/:id', echo);

function index(req: Request, res: Response) {
  const response: ResponseJSON = {
    success: true,
    message: "You've touched the API!",
    data: null,
  }
  res.json(response);
}

function echo(req: Request, res: Response) {
  const query: string = req.params.id;
  const response: ResponseJSON = {
    success: true,
    message: `You said '${query}'`,
    data: null,
  }
  res.json(response);
}
