import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePilarUseCase } from "./CreatePilarUserCase";

export class CreatePilarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { pilarName, pilarManager } = request.body;

    const createPilarUseCase = container.resolve(CreatePilarUseCase);

    const newPilar = await createPilarUseCase.execute({
      pilarName,
      pilarManager,
      userId: id,
    });

    return response.status(201).json(newPilar);
  }
}
