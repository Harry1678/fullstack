import { createReadStream } from "node:fs";
import { statSync } from "node:fs";
//01
const filePath = "/home/harsh/fullstack/node-module-codes-02/src/sample/sample.txt";
try {
  const stats = statSync(filePath);
  console.log("File Size in Bytes", stats);
} catch (err) {
  console.error("File does not exist:", filePath);
  process.exit(1);
}
//02
const readStream = createReadStream(filePath, {
  encoding: "utf-8",
  highWaterMark: 64 * 1024,
});
//03
let chunkCount = 0;
readStream.on("data", (chunk) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount} | Size: ${Buffer.byteLength(chunk)} bytes`);
});
//04
readStream.on("end", () => {
  console.log("Done reading file");
  console.log("Total chunks:", chunkCount);
});

//05
readStream.on("error", (err) => {
  console.error("Stream error:", err.message);
});
