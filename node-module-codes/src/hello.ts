// console.log("Hello From typeScript");
import { add } from "./utils/math.js";

console.log("Before error");
throw new Error("Boom from TypeScript");
console.log(add(2, 3));

