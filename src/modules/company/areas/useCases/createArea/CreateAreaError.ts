import { AppError } from "../../../../../shared/errors/AppError";

export class CreateAreaError extends AppError {
  constructor() {
    super(
      "There is a unique constraint violation, a new Area cannot be created with this name"
    );
  }
}
