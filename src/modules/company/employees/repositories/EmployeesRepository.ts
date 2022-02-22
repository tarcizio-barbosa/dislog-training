import { Employee, PrismaClient } from "@prisma/client";

import prismaClient from "../../../../shared/infra/prisma/prismaClient";
import { ICreateEmployeeDTO } from "../useCases/createEmployee/ICreateEmployeeDTO";
import {
  EmployeeCreatedData,
  IEmployeesRepository,
} from "./IEmployeesRepository";

export class EmployeesRepository implements IEmployeesRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createEmployee({
    employeeCode,
    employeeName,
    activityId,
    userId,
  }: ICreateEmployeeDTO): Promise<EmployeeCreatedData> {
    return this.repository.employee.create({
      data: {
        employeeCode,
        employeeName,
        activityId,
        userId,
      },
      select: {
        id: true,
        employeeCode: true,
        employeeName: true,
        activityId: true,
      },
    });
  }

  async getEmployeeByCode(employeeCode: number): Promise<Employee | null> {
    return this.repository.employee.findUnique({
      where: {
        employeeCode,
      },
    });
  }
}
