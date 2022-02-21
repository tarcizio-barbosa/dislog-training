import { AppError } from "../../../../../shared/errors/AppError";

export class GetPilarError extends AppError {
  constructor() {
    super("The informed Pilar does not exist");
  }
}
