import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetTrainingsUseCase } from "./GetTrainingsUseCase";

export class GetTrainingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getTrainingsUseCase = container.resolve(GetTrainingsUseCase);

    const getAllTrainings = await getTrainingsUseCase.execute();

    return response.json(getAllTrainings);
  }
}
