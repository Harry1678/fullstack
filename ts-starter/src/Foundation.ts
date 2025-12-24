


//Drill 01: Basic Types


let userName: string = "Harsh";
let age: number = 22;
let isActive: boolean = true;


let valueAny: any = "hello";
valueAny = 42;
valueAny = true;
console.log(age);
console.log(userName);
console.log(isActive);
console.log(valueAny);



// let valueUnknown: unknown = "TypeScript";

// if (typeof valueUnknown === "string") {
//   console.log(valueUnknown.toUpperCase());
// }


// let city: string | null = null;
// let country: string | undefined = undefined;


// const role = "Developer";


// //Drill 02: Type Inference

// let x = 42;

// let y;
// y = "hello";
// y = 42;//This is allowed as we have y as any

// let z: number = 42;
// // z = "Harsh";//This Will Be Error as y is number 


// //Drill 03: Type Assertions

// let unknownValue: unknown = "hello";


// let strLength = (unknownValue as string).length;
// console.log(strLength);


// let forcedNumber = unknownValue as number;
// console.log(forcedNumber);

// function unsafeCast(val: unknown): number {
//   return val as number;
// }


// //Drill 04:Type Narrowing

// function typeNarrowing(val: string | number | null) {
//   if (val === null) {
//     console.log("Value is null");
//   } else if (typeof val === "string") {
//     console.log(val.toUpperCase());
//   } else {
//     console.log(val.toFixed(2));
//   }
// }
// console.log(typeNarrowing("Harsh"));

// //instanceof
// function checkDate(input: unknown) {
//   if (input instanceof Date) {
//     console.log(input.getFullYear());
//   }
// }

// // Array narrowing
// function checkArray(input: unknown) {
//   if (Array.isArray(input)) {
//     console.log(input.length);
//   }
// }


// //Drill 05: Strict Mode Practice

// //Here we have defined strict datatypes which is recomended 
// function add(a: number, b: number) {
//   return a + b; 
// }

// function multiply(a: number, b: number): number {
//   return a * b;
// }


// //Drill06: My First TypeScript Program

// function hello(name: string, age?: number): void {
//   if (age) {
//     console.log(`Hello ${name}, age ${age}`);
//   } else {
//     console.log(`Hello ${name}`);
//   }
// }

// hello("Harsh");
// hello("Harsh", 22);
// //We have used optional parameter age passed then also ok not passed then also


// //Drill07:Type Narrowing Practice

// function processId(id: string | number): string {
//   if (typeof id === "string") {
//     return `String ID: ${id.toUpperCase()}`;
//   } else {
//     return `Number ID: ${id.toFixed(0)}`;
//   }
// }
// //here I have Used type of means if value is string then check it and print if number same for that
// console.log(processId("abc"));
// console.log(processId(101));

// //Drill08:Array Type Mastery

// const numbers: number[] = [1, 2, 3];
// const names: Array<string> = ["Harsh", "Raj"];

// const mixed: (string | number)[] = ["Aganitha", 2, "TypeScript"];

// function getarr(arr: string[]): string | undefined {
//   return arr[0];
// }
// let a=getarr(["Harsh","Tiwari"]);
// console.log(getarr);

// //Drill 09 Object Shape Practice

// const user1: { name: string; age: number; active: boolean } = {
//   name: "John",
//   age: 30,
//   active: true,
// };



// const employee: {
//   id: number;
//   department?: string;
// } = {
//   id: 101,
// };
// const student:{
//     id:number;
//     age:number,
//     name:string;
// }={
//     id:101,
//     age:22,
//     name:"Raj"
// };


// //Drill 10:Unknown vs Any

// let dataAny: any = "hello";
// console.log(dataAny.toUpperCase());//It is allowed but can give errors at runtime so we have to be careful

// let dataUnknown: unknown = "hello";


// if (typeof dataUnknown === "string") {
//   console.log(dataUnknown.toUpperCase());//unknown is always safe than any
// }



