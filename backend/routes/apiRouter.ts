import { Router, Request, Response } from "express";
import { ResponseJSON } from "../types/Responses";
import { signUpRouter } from "./signupRouter";

export const apiRouter = Router();

apiRouter.get('/', index);
apiRouter.use('/signup', signUpRouter);
apiRouter.get('/test', query);
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

// This is a nonuse query route so I can test & learn how to use URI queries
// I've never used queries before.
function query(req: Request, res: Response) {
  const { name, age } = req.query;
  const response: ResponseJSON = {
    success: true,
    message: "You give you name & age!",
    data: { name, age },
  }
  res.json(response);
}
