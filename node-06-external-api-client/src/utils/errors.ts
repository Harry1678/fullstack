export class ApiError extends Error {
  constructor(
    public code: string,
    public context: Record<string, unknown>
  ) {
    super(code);
  }
}
