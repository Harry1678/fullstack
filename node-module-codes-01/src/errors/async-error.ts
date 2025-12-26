async function fetchData(){
    throw new Error("Api Failed");
}
async function main(){
    try{
        await fetchData();
    }
    catch(err){
        console.error("Async Error Caught ",(err as Error).message);
        
    }
}
main();