import { Training } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IEmployeesRepository } from "../../../company/employees/repositories/IEmployeesRepository";
import { IDocumentsActivitiesRepository } from "../../../documents/repositories/IDocumentsActivitiesRepository";
import { ITrainingsRepository } from "../../repositories/ITrainingsRepository";
import { GetEmployeeError } from "./GetEmployeeError";
import { ICreateTrainingDTO } from "./ICreateTrainingDTO";

@injectable()
export class CreateTrainingUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository,

    @inject("DocumentsActivitiesRepository")
    private documentsActivitiesRepository: IDocumentsActivitiesRepository,

    @inject("TrainingsRepository")
    private trainingsRepository: ITrainingsRepository
  ) {}

  async execute({ employeeId }: ICreateTrainingDTO): Promise<string> {
    const employeeExists = await this.employeesRepository.getEmployeeById(
      employeeId
    );

    if (!employeeExists) {
      throw new GetEmployeeError();
    }

    const employeeTrainings =
      await this.documentsActivitiesRepository.getDocumentsActivitiesByActivityId(
        employeeExists.activityId
      );

    employeeTrainings.map(async (training) =>
      this.trainingsRepository.createTraining({
        employeeId: employeeExists.id,
        documentsOnActivitiesId: training.id,
      })
    );

    return "The training list was successfully generated";
  }
}
