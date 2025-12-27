import { debug } from "node:console";
import { writeFile, readFile } from "node:fs/promises";
import { json } from "node:stream/consumers";

const JSON_PATH = "./config.json";

async function loadJSON<T>(path:string,defaults:T):Promise<T>{
    try{
        const raw=await readFile(path,"utf-8");
        return JSON.parse(raw) as T;
    }
    catch(err){
        console.warn("Invalue missing JSON");
        return defaults;

    }
}
async function jsonHandling() {
    const config={
        appname:"Node-FS-Drills",
        port:3000,
        debug:true
    };
    await writeFile(
        JSON_PATH,
        JSON.stringify(config,null,2),
        "utf-8"
    );
   console.log("JSON Wriiten To File");
   const rawdata=await readFile(JSON_PATH,"utf-8");
   const parsedData=JSON.parse(rawdata);
   console.log("Parsed JSON",parsedData);

   const safeConfig= await loadJSON(JSON_PATH,{
    appName: "default-app",
    port: 8080,
    debug: false
   });
    
   console.log("Safe loaded config:", safeConfig);
}
jsonHandling().catch((err) => {
  console.error("JSON drill failed:", err);
});