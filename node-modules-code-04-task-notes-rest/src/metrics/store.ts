export type Metric = {
  requests: number;
  errors: number;
  totalDurationMs: number;
};

export const metrics: Record<string, Metric> = {};
