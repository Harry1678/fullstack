import fs from "node:fs";

const fileToWatch = "watch.txt";

if (!fs.existsSync(fileToWatch)) {
  console.error("File does not exist yet:", fileToWatch);
  process.exit(1);
}

let debounceTimer: NodeJS.Timeout | null = null;

function logOnce(message: string) {
  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log(message);
  }, 300);
}

const watcher = fs.watch(fileToWatch, (eventType, filename) => {
  if (eventType === "change") {
    logOnce("File modified");
  }

  if (eventType === "rename") {
    console.log("File renamed or replaced:", filename);
  }
});

console.log("Watching file:", fileToWatch);

setTimeout(() => {
  watcher.close();
  console.log("Stopped watching after 30 seconds");
}, 30_000);
