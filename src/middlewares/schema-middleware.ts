import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .send(error.details.map(detail => detail.message));
      return; 
    }
    next();
  };
}

