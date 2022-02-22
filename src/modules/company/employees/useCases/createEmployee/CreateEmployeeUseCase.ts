import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "../../../activities/repositories/IActivitiesRepository";
import {
  EmployeeCreatedData,
  IEmployeesRepository,
} from "../../repositories/IEmployeesRepository";
import { CreateEmployeeError } from "./CreateEmployeeError";
import { GetActivityError } from "./GetActivityError";
import { ICreateEmployeeDTO } from "./ICreateEmployeeDTO";

@injectable()
export class CreateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({
    employeeCode,
    employeeName,
    activityId,
    userId,
  }: ICreateEmployeeDTO): Promise<EmployeeCreatedData> {
    const employeeAlreadyExists =
      await this.employeesRepository.getEmployeeByCode(employeeCode);

    if (employeeAlreadyExists) {
      throw new CreateEmployeeError();
    }

    const activity = await this.activitiesRepository.getActivityById(
      activityId
    );

    if (!activity) {
      throw new GetActivityError();
    }

    const newEmployee = await this.employeesRepository.createEmployee({
      employeeCode,
      employeeName,
      activityId,
      userId,
    });

    return newEmployee;
  }
}
