import { AppError } from "../../../shared/errors/AppError";

export class CreateUserError extends AppError {
  constructor() {
    super(
      "There is a unique constraint violation, a new User cannot be created with this email"
    );
  }
}
