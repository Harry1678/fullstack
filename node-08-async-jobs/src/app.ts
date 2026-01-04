import express from "express";
import emailRoute from "./routes/email.route";
import fibRoute from "./routes/fib.route";

export const app = express();

app.use(express.json());
app.use(emailRoute);
app.use(fibRoute);
