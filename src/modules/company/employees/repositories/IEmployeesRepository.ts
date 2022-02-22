import { Employee, Prisma } from "@prisma/client";

import { ICreateEmployeeDTO } from "../useCases/createEmployee/ICreateEmployeeDTO";

const employeeCreatedData = Prisma.validator<Prisma.EmployeeArgs>()({
  select: {
    id: true,
    employeeCode: true,
    employeeName: true,
    activityId: true,
  },
});

export type EmployeeCreatedData = Prisma.EmployeeGetPayload<
  typeof employeeCreatedData
>;

export interface IEmployeesRepository {
  createEmployee(data: ICreateEmployeeDTO): Promise<EmployeeCreatedData>;
  getEmployeeByCode(employeeCode: number): Promise<Employee | null>;
}
