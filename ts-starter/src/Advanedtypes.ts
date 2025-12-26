



// Drill 01: Union Types + Exhaustiveness
type Status = "loading" | "success" | "error";

function handleStatus(status: Status): void {
  switch (status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Success!");
      break;
    case "error":
      console.log("Error occurred");
      break;
    default:
      const _exhaustive: never = status;
      throw new Error(`Unhandled status: ${_exhaustive}`);
  }
}

//Drill 02: Intersection Types

type HasId = {
  id: string;
};

type HasTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type Entity = HasId & HasTimestamps;

const entity: Entity = {
  id: "E1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

//Drill 03: Discriminated Unions

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    default:
      const _never: never = shape;
      throw new Error(`Unhandled shape: ${_never}`);
  }
}


//Drill 04: Type Guards

function isCircle(
  shape: Shape
): shape is { kind: "circle"; radius: number } {
  return shape.kind === "circle";
}

function areaWithGuard(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius * shape.radius;
  }

  if ("size" in shape) {
    return shape.size * shape.size;
  }

  return shape.width * shape.height;
}


//Drill 05: Conditional Types

type PromiseType<T> = T extends Promise<infer U> ? U : T;

type A1 = PromiseType<Promise<string>>;
type B1 = PromiseType<Promise<number>>;
type C1 = PromiseType<boolean>;

type Nullable<T> = T | null;

type NonNullableType<T> = T extends null | undefined ? never : T;

type CleanString = NonNullableType<string | null | undefined>;


//Drill 06: Utility Types in Depth

interface User {
  id: string;
  name?: string;
  age?: number;
}


type RequiredUser = Required<User>;


type ReadonlyUser = Readonly<User>;


type Letters = "a" | "b" | "c";

type WithoutA = Exclude<Letters, "a">;
type OnlyAB = Extract<Letters, "a" | "b">;


//Drill 07: Template Literal Types

type Events = "click" | "hover" | "focus";

type EventHandlerNames = `on${Capitalize<Events>}`;

const handlerName: EventHandlerNames = "onClick";



//Drill 08: Indexed Access & Recursive Types

type UserProfile = {
  id: string;
  profile: {
    name: string;
    address: {
      city: string;
    };
  };
};

type City = UserProfile["profile"]["address"]["city"];

//It is recursive JSON Type
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const jsonExample: JsonValue = {
  name: "Harsh",
  age: 22,
  skills: ["TS", "Node"],
  active: true,
};



