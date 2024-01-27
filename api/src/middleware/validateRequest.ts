import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    const err = new CustomError(formattedErrors, 400);
    next(err);
  } else {
    next();
  }
};
