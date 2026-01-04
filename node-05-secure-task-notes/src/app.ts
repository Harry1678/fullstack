import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(helmet());

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use("/login", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
}));

app.use(authRoutes);
app.use(protectedRoutes);

export default app;
