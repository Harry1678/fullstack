const users=[
    {id:1,name:"Harsh",role:"admin"},
    {id:2,name:"Raj",role:"Senior Developer"},
    {id:3,name:"Kunal",role:"Senior Devlopement Engineer"},


];
console.log("Before Debugger");
debugger;
const activeUsers=users.filter(u=>u.role==="user");
console.log(activeUsers);
console.log("After Debugger");
console.table(users);
console.table(activeUsers);
function crashApp(){
    throw new Error("Uncaught exception caused in the app");
}
crashApp();