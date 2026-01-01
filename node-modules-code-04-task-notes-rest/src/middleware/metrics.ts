import { Request, Response, NextFunction } from "express";
import { metrics } from "../metrics/store";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

 
 const endpoint = `${req.method} ${req.originalUrl.split("?")[0]}`;

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (!metrics[endpoint]) {
      metrics[endpoint] = {
        requests: 0,
        errors: 0,
        totalDurationMs: 0,
      };
    }

    metrics[endpoint].requests += 1;
    metrics[endpoint].totalDurationMs += duration;

    if (res.statusCode >= 400) {
      metrics[endpoint].errors += 1;
    }
  });

  next();
}
