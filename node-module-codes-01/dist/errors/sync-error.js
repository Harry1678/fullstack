"use strict";
// import { error } from "node:console";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Before error");
function divide(a, b) {
    if (b === 0) {
        throw new Error("Divison By zero");
    }
    return a / b;
}
try {
    console.log(divide(10, 0));
}
catch (err) {
    console.error(("Caught Error"), err.message);
}
//# sourceMappingURL=sync-error.js.map