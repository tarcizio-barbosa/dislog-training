import { AppError } from "../../../../../shared/errors/AppError";

export class GetActivityError extends AppError {
  constructor() {
    super("The informed Activity does not exist");
  }
}
