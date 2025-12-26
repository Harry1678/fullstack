
// console.log("API_KEY ",process.env.API_KEY);
// console.log("Process ",process.env.PORT);
// const port=process.env.PORT||8080;
// console.log("Process Will run on this Process ",port);

import dotenv from "dotenv";
dotenv.config();

function requireEnv(name){
    const value=process.env[name];
    if(!value){
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
const apiKey = requireEnv("API_KEY");
console.log("API_KEY:", apiKey);
