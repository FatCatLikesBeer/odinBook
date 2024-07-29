import { Router } from "express";
import { eventController } from '../controllers/eventController';

export const eventRouter = Router();

eventRouter.get('/:id', eventController.detail);
eventRouter.get('/', eventController.get);
eventRouter.post('/', eventController.post);
eventRouter.put('/:id', eventController.put);
eventRouter.delete('/:id', eventController.delete);
