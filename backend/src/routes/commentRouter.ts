import { Router } from "express";
import { commentController } from '../controllers/commentController';

export const commentRouter = Router();

commentRouter.get('/', commentController.get);
commentRouter.post('/', commentController.post);
commentRouter.put('/', commentController.put);
commentRouter.delete('/', commentController.delete);
