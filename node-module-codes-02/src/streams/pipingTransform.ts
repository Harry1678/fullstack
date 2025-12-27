import fs from "node:fs";
import path from "node:path";
import { Transform } from "node:stream";

const inputPath = path.resolve("src/streams/input.txt");
const outputPath = path.resolve("src/streams/output.txt");

const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath);

const upperCaseTransform = new Transform({
  transform(chunk, _, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Done");
});
readStream.on("error", (err) => {
  console.error("Read error:", err.message);
});

writeStream.on("error", (err) => {
  console.error("Write error:", err.message);
});
