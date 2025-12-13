// let number=[10,20,30,60];
// console.log(number[0]);
// console.log(number[3]);
// console.log(number.length);
// console.log(number.push(80));
// console.log(number.push(90));
// console.log(number);
// console.log(number.unshift(50));
// console.log(number);
// const names=["Harsh","Raj","Kunal"];
// for(const name of names){
//     console.log(name);
// }
// const items=["Colgate","Soap","Biscuit"];
// for(let i=0;i<items.length;i++){
//     console.log(items[i]);
// }
// const numbers=[1,2,3,4];
// const doubles=numbers.map(n=>n*2);;
// console.log(doubles);
// const names=["Harsh","Raj","Kunal"];
// const uppernames=names.map(names => names.toUpperCase);
// console.log(uppernames);
const users =[{name:"Harsh",age:21},{name:"Raj",age:23}];
const namesonly=users.map(u=>u.name);
console.log(namesonly);