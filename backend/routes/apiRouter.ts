import { Router, Request, Response } from "express";
import { ResponseJSON } from "../types/types";
import { signUpRouter } from "./signupRouter";

export const apiRouter = Router();

apiRouter.use('/signup', signUpRouter);

apiRouter.get('/:id', (req: Request, res: Response) => {
  const query: string = req.params.id;
  const response: ResponseJSON = {
    success: true,
    message: `You said '${query}'!`,
  };
  res.json(response);
})

