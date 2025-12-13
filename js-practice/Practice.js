//lesson A.js-Variables &Primitives
//let vs const
let counter=1;
console.log("Counter Start :",counter);
counter=counter+1;
const name="Harsh";
let age=21;
let isStudent=true;
let nothing=null;
let notAssigned;
let score=88.5;
console.log("Name :",name,"/tyep :",typeof name);
console.log("isStudent:",isStudent,"/type",typeof isStudent);
console.log("Nothing :",nothing,"type :",typeof nothing);
console.log("Score :",score,"Type :",typeof score);
// name="raj";
//const with object/array(mutation allowed )
const arr=[1,2,3];
arr.push(4);
console.log("arr After Push :"+arr);
const user={id:1,email:"harsh@example.com"};
user.email="harsh.t@@example.com";
console.log("User After Change ",user);
