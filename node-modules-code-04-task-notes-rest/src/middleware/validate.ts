import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/ValidationError";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ValidationError("Invalid request body"));
    }

    req.validatedBody = result.data;
    next();
  };
