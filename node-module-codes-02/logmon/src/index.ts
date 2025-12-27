import fs from "node:fs";
import readline from "node:readline";


const rawArgs = process.argv.slice(2);
const args = rawArgs[0] === "--" ? rawArgs.slice(1) : rawArgs;

if (args.length === 0) {
  console.error("Usage: logmon <file> [--filter TEXT]");
  process.exit(1);
}

const filePath = args[0];
const filterIndex = args.indexOf("--filter");
const filter =
  filterIndex !== -1 ? args[filterIndex + 1] : null;


if (!fs.existsSync(filePath)) {
  console.error("File does not exist:", filePath);
  process.exit(1);
}

console.log("Watching file:", filePath);
if (filter) console.log("Filter enabled:", filter);


function attachStream() {
  const stream = fs.createReadStream(filePath, {
    encoding: "utf8",
    flags: "r",
  });

  const rl = readline.createInterface({
    input: stream,
  });

  rl.on("line", (line) => {
    if (!filter || line.includes(filter)) {
      console.log(line);
    }
  });

  return { stream, rl };
}


let { stream, rl } = attachStream();


const watcher = fs.watch(filePath, (event) => {
  if (event === "rename") {
    console.log("Log file rotated. Re-attaching...");

    rl.close();
    stream.close();

    if (fs.existsSync(filePath)) {
      const attached = attachStream();
      stream = attached.stream;
      rl = attached.rl;
    }
  }
});


process.on("SIGINT", () => {
  console.log("\nShutting down gracefully.");
  watcher.close();
  rl.close();
  stream.close();
  process.exit(0);
});
