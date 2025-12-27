import fs from "node:fs";

const logStream = fs.createWriteStream("app.log", {
  flags: "a" 
});
for(let i=1;i<=5;i++){
   console.log(`Log Line ${i}\n`);
}
logStream.end();
logStream.on("finish",()=>{
    console.log("Log File Written Succesfully")
});
// const canContinue=logStream.write("some data \n");

// let i=0;
// function writeLogs(){
//     while(i<1000){
//         const ok=logStream.write(`Line ${i}\n`)
//         i++;

//         if(!ok){
//             logStream.once("drain",writeLogs);
//             return;
//         }

//     }
//     logStream.end();
// }
// writeLogs();

// const binaryStream=fs.createWriteStream("binary Stream");
// const buffer = Buffer.from([0xde, 0xad, 0xbe, 0xef]);

// binaryStream.write(buffer);
// binaryStream.end();

// binaryStream.on("finish", () => {
//   console.log("Binary file written");
// });
