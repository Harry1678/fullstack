import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function logInfo(message: string, meta?: any) {
  console.log(message, meta ?? "");
}

export function logError(message: string, meta?: any) {
  console.error(message, meta ?? "");
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const requestId = req.headers["x-request-id"];

  logError("Request failed", {
    requestId,
    error: err.message,
    code: err.code,
  });

  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({
      type: "about:blank",
      title: "Service Unavailable",
      status: 503,
      detail: "Database is unavailable",
      instance: `/request/${requestId}`,
    });
  }

  res.status(500).json({
    type: "about:blank",
    title: "Internal Server Error",
    status: 500,
    detail: "Unexpected error",
    instance: `/request/${requestId}`,
  });
}
