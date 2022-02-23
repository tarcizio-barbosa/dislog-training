import { AppError } from "../../../../shared/errors/AppError";

export class CreateDocumentActivityError extends AppError {
  constructor() {
    super("This document is already linked to this activity");
  }
}
