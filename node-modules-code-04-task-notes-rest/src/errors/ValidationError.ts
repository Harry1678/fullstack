import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(message: string = "Invalid query parameters") {
    super(message, 400);
  }
}
