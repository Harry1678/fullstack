console.log("Press (Ctrl+C)");
process.stdin.resume();
process.on("SIGINT",()=>{
    console.log("SIGINT Recived by (Ctrl+C)");
    setTimeout(()=>{
   
    console.log("Cleaning Up......");
    process.exit(0)
    },1000);
});

