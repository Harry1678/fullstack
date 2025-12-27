import { writeFile, appendFile, readFile, unlink, access } from "node:fs/promises";
import { constants } from "node:fs";

const FILE_PATH = "./sample.txt";

async function fileBasics() {
    await writeFile(FILE_PATH, "Hello,Node.js\n", "utf-8");
    console.log("File Created And Written");

    await appendFile(FILE_PATH, "This line Was Appeneded \n ", "utf-8");
    console.log("Line Was Added Succesfully");

    try {
        await access(FILE_PATH, constants.F_OK);
        console.log("File Exisist");
    } catch {
        console.log("File Does not Exisist");
        return;
    }

    const content=await readFile(FILE_PATH,"utf-8");
    console.log("File Content");
    console.log(content);

    await unlink(FILE_PATH);
    console.log("File Deleted");

}
fileBasics().catch((err) =>{
    console.error("Error Ocuured",err);
});
