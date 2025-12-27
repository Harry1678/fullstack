//1
const text="Hello Node";
const bufferFromString=Buffer.from(text,"utf-8");
console.log("Buffer From String ",bufferFromString);
console.log("Buffer Length (bytes) :",bufferFromString.length);

//2
const stringFromBuffer=bufferFromString.toString("utf-8");
console.log("String from Buffer",stringFromBuffer);


const utf8Buffer=Buffer.from("Node js","utf-8");
const base64Buffer=Buffer.from("Node Js","utf-8").toString("base64");

console.log("UTF-8 Buffer :",utf8Buffer);
console.log("Base 64 encoded String :",base64Buffer);

//3
const decodedBase64 = Buffer.from(base64Buffer, "base64").toString("utf8");
console.log("Decoded Base64:", decodedBase64);

//4
const fixedBuffer = Buffer.alloc(10);
fixedBuffer.fill(0xff);

console.log("Fixed buffer (10 bytes, filled):", fixedBuffer);

//5
const emoji = "🙂";
console.log("String length (characters):", emoji.length);
console.log(
  "Buffer length (bytes):",
  Buffer.from(emoji).length
);