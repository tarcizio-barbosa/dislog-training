import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAreaUseCase } from "./CreateAreaUseCase";

export class CreateAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { areaName, pilarId } = request.body;

    const createAreaUseCase = container.resolve(CreateAreaUseCase);

    const newArea = await createAreaUseCase.execute({
      areaName,
      pilarId,
      userId: id,
    });

    return response.status(201).json(newArea);
  }
}
