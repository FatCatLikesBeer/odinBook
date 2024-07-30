// Import Modules
import { Request, Response, NextFunction } from 'express';
import { ResponseJSON } from '../../types/custom/Responses';
import { Op } from 'sequelize';
import { body, validationResult } from 'express-validator';

// Import Models
import { Event } from '../models/Event';

// Import other stuff
import { eventBodyValidator } from '../functions/eventBodyValidator';
import { fuzzifyQuery } from '../functions/fuzzifyQuery';

// Event Controller
export const eventController: any = {};
eventController.get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryOptions = fuzzifyQuery(req.query, Op);
    queryOptions.visibility = "published";
    const { count, rows } = await Event.findAndCountAll({
      where: { ...queryOptions }
    });
    if (rows.length == 0) {
      const response: ResponseJSON = {
        success: true,
        message: "No Events Found",
        data: null,
      }
      req.response = response;
      next();
    } else {
      const response: ResponseJSON = {
        success: true,
        message: `Event: found ${count} event(s)`,
        data: { ...rows }
      }
      req.response = response;
      next();
    }
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 401;
    req.response = failureResponse;
    next();
  }
}

eventController.detail = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findByPk(eventId);
    if (event == null) {
      throw new Error("Incorrect event ID");
    }
    const response: ResponseJSON = {
      success: true,
      message: `Event: Detail for eventId: ${event?.dataValues.id}`,
      data: { ...event?.dataValues }
    }
    req.response = response;
    next();
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Error: ${error}`,
      data: null,
    }
    req.error = 401;
    req.response = failureResponse;
    next();
  }
}

eventController.post = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userEventOptions = req.body;
    const userData = req.tokenPayload;

    if (userData.id != userEventOptions.ownerId) {
      throw new Error("Invalid ownerId.");
    }

    const validationResult = eventBodyValidator(userEventOptions);
    if (!validationResult.success) {
      throw new Error(validationResult.message);
    } else {
      const userCreatedEvent = await Event.create({
        ownerId: userEventOptions.ownerId,
        title: userEventOptions.title,
        description: userEventOptions.description,
        images: userEventOptions.images,
        location: userEventOptions.location,
        startTime: userEventOptions.startTime,
        endTime: userEventOptions.endTime,
        externalLink: userEventOptions.externalLink,
        privacy: userEventOptions.privacy,
        visibility: userEventOptions.visibility,
      })

      const response: ResponseJSON = {
        success: true,
        message: "Event: Created",
        data: { ...userCreatedEvent.dataValues },
      }
      req.response = response;
      next()
    }
  } catch (error) {

    const failureResponse: ResponseJSON = {
      success: false,
      message: String(error),
      data: null,
    }

    req.error = 401;
    req.response = failureResponse;
    next();
  }
}

eventController.put = [
  body('id').notEmpty().escape().withMessage('Event: Bad PUT request: ID'),
  body('ownerId').trim().notEmpty().escape().withMessage('Event: Bad PUT request: owner ID'),
  body('title').trim().notEmpty().escape().withMessage('Event: Bad PUT request: title'),
  body('description').trim().notEmpty().escape().withMessage('Event: Bad PUT request: description'),
  body('location').trim().notEmpty().escape().withMessage('Event: Bad PUT request: location'),
  body('startTime').trim().notEmpty().escape().withMessage('Event: Bad PUT request: start time'),
  body('endTime').trim().notEmpty().escape().withMessage('Event: Bad PUT request: end time'),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req);
      if (!errorResult.isEmpty()) {
        req.error = 400;
        throw new Error(errorResult.array()[0].msg);
      }

      let requestedEventId = req.params.id;
      let idFromToken = req.tokenPayload.id;
      if (requestedEventId != req.body.id) {
        req.error = 400;
        throw new Error("Event: Bad PUT request: ID")
      }

      const queryResult = await Event.findOne({ where: { id: requestedEventId } });
      if (queryResult == null) {
        req.error = 400;
        throw new Error('Event: Could not find event');
      }

      // Compare user's id and event.ownerId here
      console.log("id from token", idFromToken);
      console.log("id from DB", queryResult.dataValues.id);

      if (queryResult.dataValues.ownerId != idFromToken) {
        throw new Error('Event: Bad PUT request: owner ID');
      }

      const valuesToBeUpdated = { ...req.body };
      delete valuesToBeUpdated.id;
      delete valuesToBeUpdated.createdAt;
      delete valuesToBeUpdated.updatedAt;
      await Event.update(
        { ...valuesToBeUpdated },
        { where: { id: req.body.id } }
      );

      const response: ResponseJSON = {
        success: true,
        message: "Event: Change Successful",
        data: { ...valuesToBeUpdated }
      }
      req.response = response;
      next()
    } catch (error) {
      const failureResponse: ResponseJSON = {
        success: false,
        message: `${error}`,
        data: null,
      }
      if (req.error == undefined) {
        req.error = 401;
      }
      req.response = failureResponse;
      next();
    }
  }
];

eventController.delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const eventToBeDeleted = await Event.destroy({ where: { id: eventId } });
    if (eventToBeDeleted === 0) {
      throw new Error("Could not find event");
    }
    const response: ResponseJSON = {
      success: true,
      message: "Event: Deleted",
      data: null,
    }
    req.response = response;
    next()
  } catch (error) {
    const failureResponse: ResponseJSON = {
      success: false,
      message: `Event: Error deleting: ${error}`,
      data: null,
    }
    req.error = 400;
    req.response = failureResponse;
    next();
  }
}
