// Import Modules
import { Request, Response, NextFunction, query } from 'express';
import { ResponseJSON } from '../../types/custom/Responses';
import { Op } from 'sequelize';

// Import Models
import { Event } from '../models/Event';
import { User } from '../models/User';

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
      res.json(response);
    } else {
      const response: ResponseJSON = {
        success: true,
        message: `Event: found ${count} event(s)`,
        data: { ...rows }
      }
      res.json(response);
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
    res.json(response);
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
      res.json(response);
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

eventController.put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Events controller: PUT not yet implemented",
      data: {}
    }
    res.json(response);
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

eventController.delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ResponseJSON = {
      success: true,
      message: "Events controller: DELETE not yet implemented",
      data: {}
    }
    res.json(response);
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
