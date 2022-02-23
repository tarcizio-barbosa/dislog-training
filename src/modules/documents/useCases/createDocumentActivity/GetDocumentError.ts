import { AppError } from "../../../../shared/errors/AppError";

export class GetDocumentError extends AppError {
  constructor() {
    super("The informed Document does not exist");
  }
}
