import { Router } from "express";
import { eventController } from '../controllers/eventController';

export const eventRouter = Router();

eventRouter.get('/', eventController.get);
eventRouter.get('/:id', eventController.detail);
eventRouter.post('/', eventController.post);
eventRouter.put('/:id', eventController.put);
eventRouter.delete('/:id', eventController.delete);
