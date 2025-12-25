function shutdown(reason:string){
    console.log("Shutting Down :",reason);
    process.exit(1);
}
process.on("uncaughtException",(err)=>{
   shutdown(err.message);
});
process.on("unhandledRejection",(reason)=>{
   shutdown(String(reason));
});
// console.log("Before Crash");
// throw new Error("Crash Test");
// console.log("After Crash");//It will Never run
Promise.reject(new Error("DB Failed"));