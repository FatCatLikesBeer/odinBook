import { Router, Request, Response, NextFunction } from "express";
import { ResponseJSON } from "../../types/custom/Responses";
import { signUpRouter } from "./signupRouter";
import { logInRouter } from "./loginRouter";
import { postRouter } from "./postRouter";
import { eventRouter } from "./eventRouter";
import { commentRouter } from "./commentRouter";
import { likeRouter } from "./likeRouter";
import { sendPayload } from '../middleware/sendPayload';
import { browserChecker } from '../middleware/browserChecker';

export const apiRouter = Router();

apiRouter.get('/', index);
apiRouter.use('/signup', browserChecker, signUpRouter, sendPayload);
apiRouter.use('/login', browserChecker, logInRouter, sendPayload);
apiRouter.use('/posts', browserChecker, postRouter, sendPayload);
apiRouter.use('/events', browserChecker, eventRouter, sendPayload);
apiRouter.use('/comments', browserChecker, commentRouter, sendPayload);
apiRouter.use('/likes', browserChecker, likeRouter, sendPayload);
apiRouter.use('/quickLogin', quickLogin);

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
  req.error = undefined;
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
  req.error = undefined;
  const query = req.query;
  const keys = Object.keys(query);
  let message: string = "Values you provided:";

  keys.forEach((element, index, arr) => {
    if (index == arr.length - 1) {
      message += ` and ${element}.`;
    } else {
      message += ` ${element},`;
    }
  });

  // const regex = /,$/
  // const formattedMessage = message.replace(regex, ".");
  const response: ResponseJSON = {
    success: true,
    message: message,
    data: query,
  }
  res.json(response);
}

// The quick login route will bypass conventional routes.
// This will allow a user returning to the site use the app if a valid token exists
function quickLogin(req: Request, res: Response) {
  const response: ResponseJSON = {
    success: true,
    message: "Quick login not yet implemented",
    data: {
      routeDescription: "This route will allow returning with a valid token to quickly login and use the app. When the front-end app loads, this will be one of the first API endpoints it reaches out to to activate the app.",
      route: String(req.route.path),
    }
  }
  res.json(response);
}

function deleteMe(req: Request, res: Response, next: NextFunction) {
  console.log("Original URL", req.originalUrl);
  console.log("Base URL", req.baseUrl);
  next();
}
