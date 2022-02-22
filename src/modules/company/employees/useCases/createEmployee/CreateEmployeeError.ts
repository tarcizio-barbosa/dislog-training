import { AppError } from "../../../../../shared/errors/AppError";

export class CreateEmployeeError extends AppError {
  constructor() {
    super(
      "There is a unique constraint violation, a new Employee cannot be created with this code"
    );
  }
}
