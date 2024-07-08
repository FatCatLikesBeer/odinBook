import { Router } from "express";
import { likeController } from '../controllers/likeController';

export const likeRouter = Router();

likeRouter.get('/', likeController.get);
likeRouter.post('/', likeController.post);
likeRouter.put('/', likeController.put);
likeRouter.delete('/', likeController.delete);
