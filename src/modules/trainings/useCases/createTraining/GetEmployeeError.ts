import { AppError } from "../../../../shared/errors/AppError";

export class GetEmployeeError extends AppError {
  constructor() {
    super("The informed Employee does not exist");
  }
}
