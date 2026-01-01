import { Router } from "express";
import { metrics } from "../metrics/store";

const router = Router();

router.get("/metrics", (_req, res) => {
  const response = Object.entries(metrics).map(
    ([endpoint, data]) => ({
      endpoint,
      requests: data.requests,
      errors: data.errors,
      avgResponseTimeMs:
        data.requests === 0
          ? 0
          : Math.round(data.totalDurationMs / data.requests),
    })
  );

  res.json(response);
});

export default router;
