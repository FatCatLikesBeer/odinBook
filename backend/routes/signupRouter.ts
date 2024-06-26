import { Router } from "express";
import { ResponseJSON } from '../types/types';

// import * as signUpController from '../controllers/signUpController';
const signUpController = require('../controllers/signUpController');

export const signUpRouter = Router();

signUpRouter.post('/', signUpController.post);
