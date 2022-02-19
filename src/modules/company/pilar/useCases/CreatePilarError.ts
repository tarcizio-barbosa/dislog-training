import { AppError } from "../../../../shared/errors/AppError";

export class CreatePilarError extends AppError {
  constructor() {
    super(
      "There is a unique constraint violation, a new Pilar cannot be created with this name"
    );
  }
}
