import "dotenv/config";

const args = process.argv.slice(2);

console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
console.log("Working Directory:", process.cwd());

console.log("App Name:", process.env.APP_NAME ?? "default-app");
console.log("Log Level:", process.env.LOG_LEVEL ?? "debug");

if (args.length > 0) {
  console.log("Arguments:", args.join(" "));
}

process.on("SIGINT", () => {
  console.log("Shutting down gracefully.");
  process.exit(0);
});
