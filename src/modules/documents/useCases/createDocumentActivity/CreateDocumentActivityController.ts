import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDocumentActivityUseCase } from "./CreateDocumentActivityUseCase";

export class CreateDocumentActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { documentId, activityId } = request.body;

    const createDocumentActivityUseCase = container.resolve(
      CreateDocumentActivityUseCase
    );

    const newDocumentActivity = await createDocumentActivityUseCase.execute({
      documentId,
      activityId,
      userId: id,
    });

    return response.status(201).send(newDocumentActivity);
  }
}
