import express from "express";
import path from "node:path";

const app = express();
const startTime = Date.now();

//Middleware


//JSON parsing
app.use(express.json());

//Request logger + timer
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${duration}ms`);
  });
  next();
});

//Static files
app.use(express.static(path.join(process.cwd(), "public")));

//Routes

//Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime()
  });
});

//Server info
app.get("/api/info", (req, res) => {
  res.json({
    name: "noteserver",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version
  });
});

//Echo API
app.post("/api/echo", (req, res) => {
  res.json({
    received: req.body
  });
});

//Error Handling

// Invalid JSON
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  next(err);
});

//Generic error handler
app.use((err: Error, req: any, res: any, next: any) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//Server & Shutdown

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
});
