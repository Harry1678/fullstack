import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/ValidationError";

export const validateQuery =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(new ValidationError("Invalid query parameters"));
    }

    req.validatedQuery = result.data;
    next();
  }