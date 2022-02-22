import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

export class CreateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { employeeCode, employeeName, activityId } = request.body;

    const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

    const newEmployee = await createEmployeeUseCase.execute({
      employeeCode,
      employeeName,
      activityId,
      userId: id,
    });

    return response.status(201).json(newEmployee);
  }
}
