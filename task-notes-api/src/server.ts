import express, { Express, Request, Response } from "express";
import { Server } from "node:http";
import { AppConfig } from "./config";
import { createTaskRouter } from "./routes/tasks";
import { TaskService } from "./services/task.service";
import { FileStorage } from "./storage";
import Database from "better-sqlite3";
import { UserDatabase } from "./database";
import { AuthService } from "./auth/service";
import { createAuthRouter } from "./routes/auth";
import { TaskScheduler } from "./jobs/scheduler";

export class TaskServer {
  private app: Express;
  private server?: Server;

  constructor(private config: AppConfig, private storage: FileStorage) {
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
    const taskService = new TaskService(this.storage);
    this.app.use("/api/tasks", createTaskRouter(taskService));

    const db = new Database("data/users.db");
    const userDb = new UserDatabase(db);
    const auth = new AuthService(userDb);

    this.app.use("/api/auth", createAuthRouter(auth));

    const scheduler = new TaskScheduler();

    this.app.post("/api/tasks/:id/remind", async (req, res) => {
      const when = new Date(req.body.when);
      await scheduler.scheduleReminder(req.params.id, when);
      res.json({ scheduled: true });
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
