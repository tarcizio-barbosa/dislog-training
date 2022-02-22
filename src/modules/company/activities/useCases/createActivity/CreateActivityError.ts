import { AppError } from "../../../../../shared/errors/AppError";

export class CreateActivityError extends AppError {
  constructor() {
    super(
      "There is a unique constraint violation, a new Activity cannot be created with this name"
    );
  }
}
