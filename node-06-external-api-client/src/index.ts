import "dotenv/config";
import { fetchJson } from "./client/fetchJson";
import { withRetry } from "./client/retry";
import { withAuth } from "./client/auth";
import { withCircuitBreaker } from "./client/circuitBreaker";
import { metrics } from "./utils/metrics";

async function main() {
  try {
    await withCircuitBreaker(() =>
      withRetry(() =>
        fetchJson(
          "https://api.github.com",
          withAuth(process.env.API_KEY!)
        )
      )
    );
  } catch (err) {
    console.error("Request failed");
  }

  console.log("METRICS SNAPSHOT:", metrics);
}

main();
