import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateParams =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid route parameters",
        errors: result.error.format(),
      });
    }

    req.validatedParams = result.data;
    next();
  };
