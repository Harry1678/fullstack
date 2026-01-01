import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { problemDetails } from "../utils/problemDetails";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json(
        problemDetails(
          req,
          err.status,
          err.status === 404 ? "Not Found" : "Bad Request",
          err.message
        )
      );
  }

  console.error(err);

  return res.status(500).json(
    problemDetails(
      req,
      500,
      "Internal Server Error",
      "An unexpected error occurred"
    )
  );
}
