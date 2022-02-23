import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDocumentUseCase } from "./CreateDocumentUseCase";

export class CreateDocumentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { documentCode, documentName, documentType } = request.body;

    const createDocumentUseCase = container.resolve(CreateDocumentUseCase);

    const newDocument = await createDocumentUseCase.execute({
      documentCode,
      documentName,
      documentType,
      userId: id,
    });

    return response.status(201).json(newDocument);
  }
}
