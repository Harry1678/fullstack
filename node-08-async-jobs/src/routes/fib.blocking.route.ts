import { Router } from "express";

const router = Router();

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

router.get("/fib-blocking", (req, res) => {
  const n = Number(req.query.n ?? 40);
  const start = Date.now();

  const result = fib(n);

  res.json({
    result,
    duration: Date.now() - start,
  });
});

export default router;
