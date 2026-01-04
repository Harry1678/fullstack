export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface Job<T = any> {
  id: string;
  type: string;
  payload: T;
  status: JobStatus;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
}
