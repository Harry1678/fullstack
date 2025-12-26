


//Drill01: Function Basics

function add1(a: number, b: number): number {
  return a + b;
}

function addInferred(a: number, b: number) {
  return a + b;
}

function logMessage(msg: string): void {
  console.log(msg);
}




//Drill02:Optional & Default Parameters

function greet(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(`Hello ${name}, age ${age}`);
  } else {
    console.log(`Hello ${name}`);
  }
}

function greetWithDefault(name: string, age: number = 18): void {
  console.log(`Hello ${name}, age ${age}`);
}

greet("Harsh");
greet("Harsh", 22);
greetWithDefault("Harsh");
greetWithDefault("Harsh", 25);


//Drill03:Rest Parameters

function sumAll(...nums: number[]): number {
  return nums.reduce((sum, n) => sum + n, 0);
}

console.log(sumAll(1, 2, 3));
console.log(sumAll(5, 10, 15, 20));

function sumMixed(...values: (string | number)[]): number {
  let total = 0;

  for (const v of values) {
    if (typeof v === "number") {
      total += v;
    } else {
      total += Number(v);
    }
  }
  return total;
}

console.log(sumMixed(1, "2", 3));


//Drill04:Function Overloading

function toArray(x: string): string[];
function toArray(x: number): number[];
function toArray(x: string | number): (string | number)[] {
  return [x];
}

console.log(toArray("hello"));
console.log(toArray(42));



//Drill05:Unions in Functions

function format(input: string | number | boolean): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return input ? "TRUE" : "FALSE";
  }
}


// Drill06:Control Flow with Types

function isEven(n: number): boolean {
  return n % 2 === 0;
}

if (isEven(10)) {
  console.log("Even number");
}

let counter1 = 3;
while (counter1 > 0) {
  console.log(counter1);
  counter1--;
}

type Action = "start" | "stop";

function handleAction(action: Action): void {
  switch (action) {
    case "start":
      console.log("Started");
      break;
    case "stop":
      console.log("Stopped");
      break;
    default:
      const _exhaustive: never = action;
      throw new Error(_exhaustive);
  }
}


//Drill07:Higher-Order Functions

function applyTwice(fn: (x: number) => number, val: number): number {
  return fn(fn(val));
}

console.log(applyTwice(n => n * 2, 5));

function applyTwiceGeneric<T>(fn: (x: T) => T, val: T): T {
  return fn(fn(val));
}

console.log(applyTwiceGeneric<string>(s => s + "!", "Hi"));


//Drill08: Arrow Functions

const square = (n: number): number => n * n;

const numbers1 = [1, 2, 3, 4];

const doubled = numbers1.map(n => n * 2);
const evenNumbers = numbers1.filter(n => n % 2 === 0);
const sum = numbers1.reduce((a, b) => a + b, 0);

//Drill09:Function Type Annotations

type Calculator = (a: number, b: number) => number;
type Validator = (input: string) => boolean;

const multiply1: Calculator = (a, b) => a * b;

const isNotEmpty: Validator = input => input.length > 0;

function runCalculator(fn: Calculator, x: number, y: number): number {
  return fn(x, y);
}


//Drill10:Return Type Practice

function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  if (typeof data === "number") {
    return data.toString();
  }
  return "Unsupported";
}

function logOnly(msg: string): void {
  console.log(msg);
}

function fail(msg: string): never {
  throw new Error(msg);
}


//Drill11: Callback Function Typing

function processArray(
  arr: number[],
  callback: (n: number) => number
): number[] {
  return arr.map(callback);
}

const result = processArray([1, 2, 3], n => n * 3);


//Drill12:Practical Function Scenarios

function validateUser(username: string, password: string): boolean {
  return username.length > 3 && password.length >= 6;
}

function transformData(...values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

function createConfig(
  host: string,
  port: number = 3000,
  secure: boolean = false
) {
  return { host, port, secure };
}



