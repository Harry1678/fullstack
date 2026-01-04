import app from "./app";
import { closeDb } from "./db/database";

const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});


process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  closeDb();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
