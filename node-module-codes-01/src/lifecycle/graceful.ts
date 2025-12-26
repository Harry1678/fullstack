let isShutingDown=false;
process.stdin.resume();
function shutdown(signal:string){

    if(isShutingDown) return;
    isShutingDown=true;
    console.log(`Shutting Down Due To ${signal}`);
     setTimeout(()=>{
       console.log("Cleanup Done");
       process.exit(0);
     },1000);
     
}
process.on("SIGINT",()=>shutdown("SIGINT"));
process.on("SIGTERM",()=>shutdown("SIGTERM"));