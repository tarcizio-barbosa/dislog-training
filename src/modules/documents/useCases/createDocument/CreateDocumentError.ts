import { AppError } from "../../../../shared/errors/AppError";

export class CreateDocumentError extends AppError {
  constructor() {
    super(
      "There is a unique constraint violation, a new Document cannot be created with this code"
    );
  }
}
