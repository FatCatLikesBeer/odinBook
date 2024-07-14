import { Router, Request, Response } from "express";
import { ResponseJSON } from "../../types/custom/Responses";
import { signUpRouter } from "./signupRouter";
import { logInRouter } from "./loginRouter";
import { postRouter } from "./postRouter";
import { eventRouter } from "./eventRouter";
import { commentRouter } from "./commentRouter";
import { likeRouter } from "./likeRouter";
import { sendPayload } from '../middleware/sendPayload';

export const apiRouter = Router();

apiRouter.get('/', index);
apiRouter.use('/signup', signUpRouter, sendPayload);
apiRouter.use('/login', logInRouter, sendPayload);
apiRouter.use('/posts', postRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/likes', likeRouter);

apiRouter.get('/query', query);
apiRouter.get('/:id', echo);

function index(req: Request, res: Response) {
  req.error = undefined;
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
  const query = req.query;
  const response: ResponseJSON = {
    success: true,
    message: "You give you name & age!",
    data: query,
  }
  res.json(response);
}
