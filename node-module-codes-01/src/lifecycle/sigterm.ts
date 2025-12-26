console.log("Process Running Pid :",process.pid);
process.stdin.resume();
process.on("SIGTERM",()=>{
    console.log("SIGTERM Recived");
    setTimeout(()=>{
    console.log("Cleanup done");
    process.exit(0);
    },1000);
    
});