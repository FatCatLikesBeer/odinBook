import { Router } from "express";
import { logInController } from '../controllers/logInController';

export const logInRouter = Router();

logInRouter.post('/', logInController.post);
