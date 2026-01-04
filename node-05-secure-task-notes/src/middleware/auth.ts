import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import { AuthJwtPayload } from "../types/jwt";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      type: "about:blank",
      title: "Unauthorized",
      status: 401,
      detail: "Missing token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthJwtPayload;
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({
      type: "about:blank",
      title: "Unauthorized",
      status: 401,
      detail: "Invalid or expired token",
    });
  }
}
