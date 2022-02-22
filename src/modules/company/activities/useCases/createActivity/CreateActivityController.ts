import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateActivityUseCase } from "./CreateActivityUseCase";

export class CreateActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { activityName, areaId } = request.body;

    const createActivityUseCase = container.resolve(CreateActivityUseCase);

    const newActivity = await createActivityUseCase.execute({
      activityName,
      areaId,
      userId: id,
    });

    return response.status(201).json(newActivity);
  }
}
