import { Router, Request, Response } from "express";
import { Client } from "pg";
import { createUser, getUserById, listUsers } from "../repos/userRepo";
import { problem } from "../utils/errors";

export function createRoutes(db: Client) {
  const router = Router();

  // POST /users
  router.post("/users", async (req: Request, res: Response) => {
    try {
      const user = await createUser(db, req.body.email);
      return res.status(201).json(user);
    } catch (err: any) {
      if (err.code === "23505") {
        return res.status(409).json(problem(409, "User already exists"));
      }
      throw err;
    }
  });

  // GET /users/:id
  router.get("/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await getUserById(db, Number(req.params.id));
      if (!user) {
        return res.status(404).json(problem(404, "Not Found"));
      }
      return res.json(user);
    } catch (err: any) {
      if (
        err.code === "ECONNREFUSED" ||
        err.message?.includes("Client was closed")
      ) {
        return res.status(503).json(problem(503, "Service Unavailable"));
      }
      throw err;
    }
  });

  // GET /users (pagination + DB down handling)
  router.get("/users", async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit ?? 10);
      const offset = Number(req.query.offset ?? 0);

      const users = await listUsers(db, limit, offset);
      return res.json(users);
    } catch (err: any) {
      if (
        err.code === "ECONNREFUSED" ||
        err.message?.includes("Client was closed")
      ) {
        return res.status(503).json(problem(503, "Service Unavailable"));
      }
      throw err;
    }
  });

  return router;
}
