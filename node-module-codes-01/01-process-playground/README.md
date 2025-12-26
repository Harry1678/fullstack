# Process Playground (Node.js)

## Overview

This project is a small Node.js CLI application created to understand **Node.js as a runtime** rather than a framework.  
The focus is on how a Node process starts, runs, receives input, and shuts down.

The project intentionally avoids business logic and instead concentrates on runtime behavior, tooling, and lifecycle handling.

---

## What This Project Demonstrates

- How a Node process works internally
- Reading environment variables from `.env`
- Handling command-line arguments
- Using pnpm scripts for dev, build, start, and debug
- Debugging Node applications with `--inspect`
- Graceful shutdown using process signals

---

## How to Run

Development mode (TypeScript, no build):
```bash
pnpm run dev

#with Arguements
pnpm run dev -- hello world

#Build and run compiled JavaScript:
pnpm run build
pnpm run start

#Debug mode
pnpm run debug
