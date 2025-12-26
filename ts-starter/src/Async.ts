


//Drill 01:Promise Fundamentals


const numberPromise: Promise<number> = new Promise(resolve => {
  resolve(42);
});


async function addAsync(a: number, b: number): Promise<number> {
  return a + b;
}


function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//Drill02:async/await Basics

interface User5 {
  id: string;
  name: string;
  
}

async function fetchUser(id: string): Promise<User5> {
  await delay(300);
  return { id, name: "User " + id };
}

async function demoAwait() {
  const user = await fetchUser("1");
  console.log(user.name);

  const promiseUser = fetchUser("2");
  
}


//Drill03:Sequential vs Parallel

async function sequentialFetch() {
  const start = Date.now();
  await fetchUser("1");
  await fetchUser("2");
  console.log("Sequential:", Date.now() - start, "ms");
}

async function parallelFetch() {
  const start = Date.now();
  await Promise.all([fetchUser("1"), fetchUser("2")]);
  console.log("Parallel:", Date.now() - start, "ms");
}

async function partialSuccess() {
  const results = await Promise.allSettled([
    fetchUser("1"),
    Promise.reject("failed"),
  ]);
  console.log(results);
}


//Drill04:Timeouts

function timeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), ms);

    p.then(value => {
      clearTimeout(timer);
      resolve(value);
    }).catch(err => {
      clearTimeout(timer);
      reject(err);
    });
  });
}


//Drill05:Retries with Backoff

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface RetryableError extends Error {
  retryable?: boolean;
}

async function retry<T>(
  op: () => Promise<T>,
  attempts = 2,
  backoffMs = 250
): Promise<T> {
  try {
    return await op();
  } catch (err) {
    const e = err as RetryableError;
    if (attempts > 0 && e.retryable) {
      await sleep(backoffMs);
      return retry(op, attempts - 1, backoffMs * 2);
    }
    throw err;
  }
}


//Drill06:Cancellation with AbortController

function withTimeoutSignal(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, signal: controller.signal, timer };
}

async function abortableTask(signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("Aborted"));
    }

    signal.addEventListener("abort", () => {
      reject(new Error("Aborted"));
    });

    setTimeout(resolve, 500);
  });
}


//Drill07:Concurrency Limits 

class Semaphore {
  private queue: (() => void)[] = [];
  private count: number;

  constructor(limit: number) {
    this.count = limit;
  }

  async acquire(): Promise<void> {
    if (this.count > 0) {
      this.count--;
      return;
    }
    await new Promise<void>(resolve => this.queue.push(resolve));
  }

  release(): void {
    this.count++;
    const next = this.queue.shift();
    if (next) {
      this.count--;
      next();
    }
  }
}

async function runWithLimit<T>(
  limit: number,
  tasks: (() => Promise<T>)[]
): Promise<T[]> {
  const sem = new Semaphore(limit);
  const results: T[] = [];

  await Promise.all(
    tasks.map(async task => {
      await sem.acquire();
      try {
        const res = await task();
        results.push(res);
      } finally {
        sem.release();
      }
    })
  );

  return results;
}


//Drill08:Error Handling Patterns

type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

async function safeFetchUser(id: string): Promise<Result<User5>> {
  try {
    const user = await fetchUser(id);
    return { ok: true, value: user };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}


//Drill09:Fire-and-Forget (Carefully)

function backgroundTask(): Promise<void> {
  return delay(200).then(() => {
    console.log("Background task done");
  });
}

//This is Fire and Forget With Safety
backgroundTask().catch(err => {
  console.error("Background error:", err);
});


//Drill10:Typing Async APIs

type ApiResponse<T> = {
  status: number;
  data: T;
};

async function getUserApi(id: string): Promise<ApiResponse<User5>> {
  const user = await fetchUser(id);
  return { status: 200, data: user };
}


async function typedFetch<T>(promise: Promise<T>): Promise<T> {
  return await promise;
}





