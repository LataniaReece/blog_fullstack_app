import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import { Prisma } from "@prisma/client";

const devErrors = (res: Response, error: Error) => {
  const err = {
    message: error.message,
    stackTrace: error.stack,
    error: error,
  };
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      ...err,
    });
  } else {
    res.status(500).send(err);
  }
};

const duplicateKeyErrorHandler = (
  err: Prisma.PrismaClientKnownRequestError
) => {
  const field = err.meta?.target || "field";
  const modelName = err.meta?.modelName || "Resource";
  const msg = `There is already a ${modelName} with that ${field}. Please use another ${field}!`;

  return new CustomError(msg, 400);
};

const recordNotFoundErrorHandler = (
  err: Prisma.PrismaClientKnownRequestError
) => {
  const modelName = err.meta?.modelName || "Resource";
  const msg = `${modelName} not found.`;
  return new CustomError(msg, 404);
};

const prodErrors = (res: Response, error: Error) => {
  if (error instanceof CustomError && error.isOperational) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong! Please try again later.",
    });
  }
};

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        error = duplicateKeyErrorHandler(error);
      } else if (error.code === "P2025") {
        error = recordNotFoundErrorHandler(error);
      }
    }

    prodErrors(res, error);
  }
};
export default globalErrorHandler;
