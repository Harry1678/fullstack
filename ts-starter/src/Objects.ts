/*************************************************
 * Section 3: Objects & Interfaces
 * File: objects-and-interfaces.ts
 *************************************************/


/* ==============================================
   Drill 01: Object Types
============================================== */

// Define an object type
type Person = {
  readonly id: string;
  name: string;
  age: number;
  middleName?: string;
  location?:string;
};

// Create a variable of type Person
const person1: Person = {
  id: "P001",
  name: "Harsh",
  age: 22,
};

// person1.id = "P002"; // Error: Cannot assign to 'id' because it is readonly
// person1.age = "twenty"; // Error: Type mismatch

// Safe access of optional property
console.log(person1.middleName?.toUpperCase());


/* ==============================================
   Drill 02: Interfaces vs Type Aliases
============================================== */

// Interface
interface Car {
  make: string;
  model: string;
}

// Type alias
type Bike = {
  make: string;
  gears: number;
};

// Extending interface
interface ElectricCar extends Car {
  batteryCapacity: number;
}

// Intersection type with alias
type ElectricBike = Bike & {
  batteryRange: number;
};

const tesla: ElectricCar = {
  make: "Tesla",
  model: "Model 3",
  batteryCapacity: 75,
};

const eBike: ElectricBike = {
  make: "Giant",
  gears: 21,
  batteryRange: 80,
};


/* ==============================================
   Drill 03: Optional Properties
============================================== */

const person2: Person = {
  id: "P002",
  name: "Raj",
  age: 25,
  
};

// Optional chaining
console.log(person2.middleName?.length);

// console.log(person2.middleName.length); // Error: Object is possibly undefined


/* ==============================================
   Drill 04: Index Signatures
============================================== */

// Dictionary with string values
interface Dictionary {
  [key: string]: string;
}

const greetings: Dictionary = {
  en: "Hello",
  fr: "Bonjour",
};

// greetings.count = 5; // Error: number not assignable to string

// Updated dictionary with union values
interface FlexibleDictionary {
  [key: string]: string | number;
}

const mixedDict: FlexibleDictionary = {
  en: "Hello",
  count: 5,
};


/* ==============================================
   Drill 05: Utility Types
============================================== */

// Partial: all fields optional
const partialPerson: Partial<Person> = {
  name: "Temporary",
};

// Pick: select specific fields
const nameOnly: Pick<Person, "name"> = {
  name: "Harsh",
};

// Omit: exclude specific fields
const withoutAge: Omit<Person, "age"> = {
  id: "P003",
  name: "Kunal",
};

// Combination of utility types
type EditablePerson = Partial<Omit<Person, "id">>;


/* ==============================================
   Drill 06: Extending Interfaces
============================================== */

interface Employee extends Person {
  role: string;
  department?: string;
}

const emp1: Employee = {
  id: "E001",
  name: "Amit",
  age: 28,
  role: "Developer",
};

// Missing name or age would cause an error


/* ==============================================
   Drill 07: Structural Typing
============================================== */

function printPerson(p: Person): void {
  console.log(`${p.name} (${p.age})`);
}

// Extra properties are allowed as long as structure matches
printPerson({
  id: "P010",
  name: "Sneha",
  age: 24,
  location: "Pune", // extra property allowed
});


/* ==============================================
   Drill 08: Records and Maps
============================================== */

// Record type
const prices: Record<string, number> = {
  apple: 100,
  banana: 40,
};

// Map type
const peopleMap = new Map<string, Person>();

peopleMap.set("P001", person1);
peopleMap.set("P002", person2);

// Difference:
// Record -> plain object, fixed shape
// Map -> runtime structure with methods (set, get, has)


/* ==============================================
   END: Objects & Interfaces
============================================== */
