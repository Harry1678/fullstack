process.on("Uncaught Exaception",(err)=>{
   console.error("Uncaught Exception Caught",err.message)
   process.exit(1);
})
console.log("Before Crash");
throw new Error("Something Went Wrong Terribly");//This is not written Inside try Catch 
// Thats why It Is Bad Practice
console.log("After Crash");
