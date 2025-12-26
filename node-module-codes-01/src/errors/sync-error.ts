// import { error } from "node:console";

console.log("Before error");
function divide(a:number,b:number):number{
    if(b===0){
        throw new Error("Divison By zero");
    }
    return a/b;
}
try{
    console.log(divide(10,0));
}catch(err){
    console.error(("Caught Error"),(err as Error).message);
    
}
