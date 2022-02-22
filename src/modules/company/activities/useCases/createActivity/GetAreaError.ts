import { AppError } from "../../../../../shared/errors/AppError";

export class GetAreaError extends AppError {
  constructor() {
    super("The informed Area does not exist");
  }
}
