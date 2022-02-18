import { AppError } from "../../../../shared/errors/AppError";

export class IncorrectEmailOrPasswordError extends AppError {
  constructor() {
    super("Incorrect E-mail or Password");
  }
}
