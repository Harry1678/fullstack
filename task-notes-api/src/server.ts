import express, { Express, Request, Response } from "express";
import { Server } from "node:http";
import { AppConfig } from "./config";

import { createTaskRouter } from "./routes/tasks";
import { TaskService } from "./services/task.service";
import { TaskRepository } from "./repositories/task.repository";

import { postgresPool } from "./database/postgres";
import { checkDbHealth } from "./database/health";

import Database from "better-sqlite3";
import { UserDatabase } from "./database";
import { AuthService } from "./auth/service";
import { createAuthRouter } from "./routes/auth";

import { TaskScheduler } from "./jobs/scheduler";
import { createProjectRouter } from "./routes/projects";
import { isDbAvailable } from "./database/healthState";
import { requestId } from './middleware/requestId';
import { metrics } from './database/metrics';
export class TaskServer {
  private app: Express;
  private server?: Server;

  constructor(private config: AppConfig) {
    this.app = express();
    this.setupApp();
  }

  private setupApp(): void {
    this.app.use(express.json());

    this.app.get("/health", (_req: Request, res: Response) => {
      res.json({
        status: "ok",
        env: this.config.env,
      });
    });

    this.app.get("/health/db", async (_req, res) => {
      const ok = await checkDbHealth();

      if (!ok) {
        return res.status(503).json({ status: "down" });
      }

      res.json({ status: "up" });
    });

    const taskRepository = new TaskRepository(postgresPool);
    const taskService = new TaskService(taskRepository);
    this.app.use("/api/tasks", createTaskRouter(taskService));

    const sqliteDb = new Database("data/users.db");
    const userDb = new UserDatabase(sqliteDb);
    const authService = new AuthService(userDb);
    this.app.use("/api/auth", createAuthRouter(authService));

    const scheduler = new TaskScheduler();
    this.app.post("/api/tasks/:id/remind", async (req, res) => {
      const when = new Date(req.body.when);
      await scheduler.scheduleReminder(req.params.id, when);
      res.json({ scheduled: true });
    });

    this.app.use("/api/projects", createProjectRouter());
    this.app.get("/health/db", (_req: Request, res: Response) => {
      if (!isDbAvailable()) {
        return res.status(503).json({ status: "down" });
      }

      res.json({ status: "up" });
    });
    this.app.use(requestId);
    

this.app.get('/metrics/db', (_req, res) => {
  res.json(metrics);
});


  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(this.config.port, () => {
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    if (!this.server) return;

    return new Promise((resolve) => {
      this.server!.close(() => {
        resolve();
      });
    });
  }
}
