import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTrainingUseCase } from "./CreateTrainingUseCase";

export class CreateTrainingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.body;

    const createTrainingUseCase = container.resolve(CreateTrainingUseCase);

    const newTrainingList = await createTrainingUseCase.execute({
      employeeId,
    });

    return response.status(201).json(newTrainingList);
  }
}
