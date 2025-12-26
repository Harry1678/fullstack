"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("Hello From typeScript");
const math_js_1 = require("./utils/math.js");
console.log("Before error");
throw new Error("Boom from TypeScript");
console.log((0, math_js_1.add)(2, 3));
//# sourceMappingURL=hello.js.map