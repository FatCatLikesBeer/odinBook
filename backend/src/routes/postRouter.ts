import { Router } from "express";
import { postController } from '../controllers/postController';

export const postRouter = Router();

postRouter.get('/', postController.get);
postRouter.post('/', postController.post);
postRouter.put('/', postController.put);
postRouter.delete('/', postController.delete);
