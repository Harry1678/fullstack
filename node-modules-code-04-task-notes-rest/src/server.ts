import app from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down gracefully");
  server.close(() => process.exit(0));
});
