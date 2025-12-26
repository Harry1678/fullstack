


//Drill01:Generic Functions

function identity<T>(arg: T): T {
  return arg;
}


const numValue = identity(42);
const strValue = identity("Hello");


const explicitString = identity<string>("TypeScript");


const objValue = identity({ id: 1, name: "Harsh" });


function unsafeIdentity(arg: any): any {
  return arg;
}


// Drill02:Arrays&Collections

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = first([1, 2, 3]);
const firstString = first(["a", "b", "c"]);


const mixedFirst = first([1, "two"]);


//Drill03:Constraints


function lengthOf<T extends { length: number }>(x: T): number {
  return x.length;
}
//Single Constraints
lengthOf("hello");
lengthOf([1, 2, 3]);
lengthOf({ length: 10 });


//Multiple Constraints
interface HasId1 {
  id: string;
}

interface HasName {
  name: string;
}

function describeEntity<T extends HasId1 & HasName>(entity: T): string {
  return `${entity.id}: ${entity.name}`;
}

describeEntity({ id: "U1", name: "Harsh", role: "Dev" });


//Drill04:Default Type Parameter

type ApiResponse1<T = unknown> = {
  status: number;
  data: T;
};

const stringResponse: ApiResponse1<string> = {
  status: 200,
  data: "OK",
};

const unknownResponse: ApiResponse1 = {
  status: 200,
  data: { message: "Anything" },
};


//Drill 05: keyof & Lookup Types

interface User {
  id: string;
  age1: number;
}

type Keys<T> = keyof T;

type UserKeys = Keys<User>; 

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: "U1", age1: 22 };

const userId = getProp(user, "id");
//getProp(user, "name");it is a error as user not defined


//Drill06:Mapped Types

type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUser1 = ReadonlyType<User>;

const readonlyUser: ReadonlyUser1 = {
  id: "U2",
  age1: 30,
};
//readonly.id="U1"//Error as only readonly file


type PartialType<T> = {
  [K in keyof T]?: T[K];
};

const partialUser: PartialType<User> = {
  id: "U3",
};


//Drill07:Conditional Types

type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<string[]>;
type B = ElementType<number[]>;
type C = ElementType<boolean>;


//Drill08:Utility Types in Practice

type UserMap<T> = Record<string, T>;

const usersById: UserMap<User> = {
  U1: { id: "U1", age1: 22 },
};

type UserIdOnly = Pick<User, "id">;
type UserWithoutAge = Omit<User, "age">;

function pluck<T, K extends keyof T>(objs: T[], key: K): T[K][] {
  return objs.map(obj => obj[key]);
}

const userAges = pluck(
  [{ id: "U1", age: 20 }, { id: "U2", age: 25 }],
  "age"
);



