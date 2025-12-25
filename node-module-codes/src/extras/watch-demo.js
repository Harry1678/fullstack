console.log("App Started at ",new Date().toLocaleTimeString());
console.time("task");
for(let i=0;i<1e6;i++){}
console.timeEnd("task");