import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function expressErrorValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorArray = errors.array()[0];
  console.log(`Error in payload: ${JSON.stringify(errorArray, null, 2)}`);

  return res.status(400).json(`${errorArray.param}: ${errorArray.msg}`);
}
