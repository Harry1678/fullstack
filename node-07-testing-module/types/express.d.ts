import { Client } from "pg";

declare global {
  namespace Express {
    interface Request {
      db: Client;
      requestId?: string;
    }
  }
}

export {};
