


//Drill01:Class Basics

class Counter {
  private count: number;

  constructor(initial: number = 0) {
    this.count = initial;
  }

  inc(): this {
    this.count++;
    return this;
  }

  dec(): this {
    this.count--;
    return this;
  }

  value(): number {
    return this.count;
  }
}

const counter = new Counter(5).inc().inc().dec();
console.log(counter.value());


 //Drill 02: Access Modifiers & Private Fields

class AccessDemo {
  public name: string = "Public";
  protected role: string = "Protected";
  private secretCode: number = 1234;
  #secretMessage: string = "Top Secret";

  revealSecret(): string {
    return this.#secretMessage;
  }
}

const demo = new AccessDemo();
// demo.secretCode;this is error as secretcode is private
// demo.role;//role is protected
// demo.#secretMessage;//secret message is Protected ecmascript version


//Drill03:Getters & Setters

class SmartCounter {
  private count: number = 0;
  private stepValue: number = 1;

  constructor(initial: number = 0) {
    this.count = initial;
  }

  get isZero(): boolean {
    return this.count === 0;
  }

  set step(n: number) {
    if (n <= 0) {
      throw new Error("Step must be positive");
    }
    this.stepValue = n;
  }

  inc(): this {
    this.count += this.stepValue;
    return this;
  }

  value(): number {
    return this.count;
  }
}


//Drill04:Static Members & Factory Function

class TrackedCounter {
  private count: number;
  static created = 0;

  constructor(initial: number = 0) {
    this.count = initial;
    TrackedCounter.created++;
  }

  value(): number {
    return this.count;
  }

  static fromJSON(json: string): TrackedCounter {
    const data = JSON.parse(json);
    return new TrackedCounter(data.count);
  }
}

// Factory function 
function makeCounter(initial: number = 0) {
  let count = initial;

  return {
    inc() {
      count++;
      return this;
    },
    value() {
      return count;
    },
  };
}

const c1 = TrackedCounter.fromJSON(`{"count":10}`);
const c2 = makeCounter(5).inc().inc();


//Drill 05: Inheritance vs Composition

//Inheritence approach with extends keyword (not Prefered)
class BoundedCounter extends Counter {
  constructor(initial: number, private max: number) {
    super(initial);
  }

  inc(): this {
    if (this.value() < this.max) {
      super.inc();
    }
    return this;
  }
}

//Compostion Approach(Prefered)
class ComposedBoundedCounter {
  constructor(private inner: Counter, private max: number) {}

  inc(): this {
    if (this.inner.value() < this.max) {
      this.inner.inc();
    }
    return this;
  }

  value(): number {
    return this.inner.value();
  }
}




//Drill06:Abstract Contracts

abstract class Store<T> {
  abstract get(key: string): T | undefined;
  abstract set(key: string, value: T): void;
  abstract has(key: string): boolean;
}

class MemoryStore<T> extends Store<T> {
  private data = new Map<string, T>();

  get(key: string): T | undefined {
    return this.data.get(key);
  }

  set(key: string, value: T): void {
    this.data.set(key, value);
  }

  has(key: string): boolean {
    return this.data.has(key);
  }
}


interface StoreInterface<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
}


//Drill07:Generic Classes & Invariants

class SafeStore<T> {
  private data = new Map<string, T>();
  private open = true;

  private requireOpen(): void {
    if (!this.open) {
      throw new Error("Store is closed");
    }
  }

  set(key: string, value: T): void {
    this.requireOpen();
    this.data.set(key, value);
  }

  get(key: string): T | undefined {
    this.requireOpen();
    return this.data.get(key);
  }

  close(): void {
    this.open = false;
  }
}


//Drill08:Practical Class Applications


class Logger {
  info(msg: string): void {
    console.log(`[INFO] ${msg}`);
  }

  warn(msg: string): void {
    console.warn(`[WARN] ${msg}`);
  }

  error(msg: string): void {
    console.error(`[ERROR] ${msg}`);
  }
}


class Cache1<K, V> {
  private store = new Map<K, V>();

  constructor(private maxSize: number) {}

  set(key: K, value: V): void {
    if (this.store.size >= this.maxSize) {
      throw new Error("Cache limit exceeded");
    }
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }
}

class Timer {
  private startTime = 0;
  private elapsed = 0;

  start(): void {
    this.startTime = Date.now();
  }

  stop(): void {
    this.elapsed += Date.now() - this.startTime;
  }

  reset(): void {
    this.elapsed = 0;
  }

  getElapsed(): number {
    return this.elapsed;
  }
}


class ValidationResult {
  constructor(
    public success: boolean,
    public errors: string[] = []
  ) {}
}



