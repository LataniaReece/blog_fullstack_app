export class CustomError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // isOperational: True for anticipated errors in normal operation (e.g., invalid user input, resource not found). Since I will be using CustomError, this is only true when I use CustomError in the code.
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
