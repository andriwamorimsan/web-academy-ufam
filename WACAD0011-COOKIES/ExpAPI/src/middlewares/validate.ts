import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    return next();
  };
};

export default validate;
