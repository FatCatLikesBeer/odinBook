import { Router } from "express";
import { signUpController } from '../controllers/signUpController';

export const signUpRouter = Router();

signUpRouter.post('/', signUpController.post);
