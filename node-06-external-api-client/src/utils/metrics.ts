type Histogram = {
  "2xx": number;
  "4xx": number;
  "5xx": number;
};

export const metrics = {
  latency: [] as number[],
  status: {
    "2xx": 0,
    "4xx": 0,
    "5xx": 0,
  } as Histogram,
};

export function recordStatus(status: number) {
  if (status >= 200 && status < 300) metrics.status["2xx"]++;
  else if (status >= 400 && status < 500) metrics.status["4xx"]++;
  else if (status >= 500) metrics.status["5xx"]++;
}
