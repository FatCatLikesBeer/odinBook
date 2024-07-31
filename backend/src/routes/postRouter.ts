import { Router } from "express";
import { postController } from '../controllers/postController';

export const postRouter = Router();

postRouter.get('/', postController.get);
postRouter.get('/:id', postController.detail);
postRouter.post('/', postController.post);
postRouter.put('/:id', postController.put);
postRouter.delete('/:id', postController.delete);
