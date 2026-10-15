import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validationErrors: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: string[] = [];
  errors.array().forEach(err => extractedErrors.push(err.msg));

  res.status(422).json({
    errors: extractedErrors,
  });
};
