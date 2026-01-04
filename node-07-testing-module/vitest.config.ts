import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    pool: "forks",

  
    hookTimeout: 30_000,
    testTimeout: 30_000,

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});

