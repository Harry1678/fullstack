import express from "express";
import path from "node:path";
import { randomUUID } from "node:crypto";


const app = express();

//DRILL3: BODY PARSING
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

//DRILL5: GLOBAL MIDDLEWARE


app.use((req, _res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});


app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      `[TIME] ${req.method} ${req.url} - ${Date.now() - start}ms`
    );
  });
  next();
});


app.use((req, res, next) => {
  const requestId = randomUUID();
  (req as any).requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
});

 //DRILL8: STATIC FILES & CORS
import cors from "cors";

app.use(express.static("public"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});


app.options("*", (_req, res) => {
  res.sendStatus(204);
});


app.use("/api", cors());

app.use(
  "/admin",
  cors({
    origin: "http://localhost:5173",
  })
);


//DRILL7: ROUTERS


const apiRouter = express.Router();


apiRouter.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});


apiRouter.get("/ping", (req, res) => {
  res.json({
    ok: true,
    requestId: (req as any).requestId,
  });
});


apiRouter.get("/info", (_req, res) => {
  res.json({
    app: "express-basics",
    uptime: process.uptime(),
  });
});


app.use("/api", apiRouter);


const usersRouter = express.Router();

usersRouter.get("/:id/posts", (req, res) => {
  res.json({
    message: "User Fetched",
    userId: req.params.id,
    limit: req.query.limit,
  });
});

app.use("/users", usersRouter);

//DRILL 1 & 2: BASIC ROUTES

app.get("/", (_req, res) => {
  res.send("Hello Express");
});

app.get("/search", (req, res) => {
  res.json({ searchQuery: req.query.q });
});

//DRILL3:REQUEST BODIES

app.post("/echo", (req, res) => {
  res.json({ received: req.body });
});

app.post("/form", (req, res) => {
  res.json({ formData: req.body });
});

//DRILL 4: RESPONSE PATTERNS

app.get("/status/ok", (_req, res) =>
  res.status(200).json({ message: "OK" })
);

app.post("/status/created", (_req, res) =>
  res.status(201).json({ message: "Created" })
);

app.get("/status/bad", (_req, res) =>
  res.status(400).json({ error: "Bad Request" })
);

app.get("/headers", (_req, res) => {
  res
    .set("X-App-Name", "express-basics")
    .set("X-Source", "training")
    .json({ ok: true });
});

app.get("/text", (_req, res) =>
  res.type("text/plain").send("Plain text response")
);

app.get("/file", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "hello.txt"));
});

app.get("/old", (_req, res) => res.redirect(301, "/new"));
app.get("/new", (_req, res) => res.send("Redirect successful"));

//DRILL5: ROUTE-LEVEL MIDDLEWARE

const adminOnly = (_req: any, _res: any, next: any) => {
  console.log("Admin middleware executed");
  next();
};

app.get("/admin", adminOnly, (_req, res) => {
  res.send("Admin Only");
});

//DRILL6: ERROR HANDLING

app.get("/crash", () => {
  throw new Error("Something went wrong!");
});

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  console.error("Error:", err.message);
  res.status(500).json({
    ok: false,
    error: err.message,
  });
});

//404 HANDLER 

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

//SERVER & SHUTDOWN

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down gracefully");
  server.close(() => process.exit(0));
});
