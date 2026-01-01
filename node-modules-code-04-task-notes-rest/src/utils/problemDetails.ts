import { Request } from "express";

export function problemDetails(
  req: Request,
  status: number,
  title: string,
  detail: string,
  type = "about:blank"
) {
  return {
    type,
    title,
    status,
    detail,
    instance: req.originalUrl,
  };
}
