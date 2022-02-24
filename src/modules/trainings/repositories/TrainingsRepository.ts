import { PrismaClient, Training } from "@prisma/client";

import prismaClient from "../../../shared/infra/prisma/prismaClient";
import { ICreateTrainingDTO } from "../useCases/createTraining/ICreateTrainingDTO";
import { ITrainingsRepository } from "./ITrainingsRepository";

export class TrainingRepository implements ITrainingsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createTraining({
    employeeId,
    documentsOnActivitiesId,
  }: ICreateTrainingDTO): Promise<void> {
    await this.repository.training.create({
      data: {
        employeeId,
        documentsOnActivitiesId,
      },
    });
  }

  async getTraining(
    employeeId: string,
    documentsOnActivitiesId: string
  ): Promise<Training | null> {
    return this.repository.training.findUnique({
      where: {
        employeeId_documentsOnActivitiesId: {
          employeeId,
          documentsOnActivitiesId,
        },
      },
    });
  }

  async getAllTrainings(): Promise<Training[]> {
    return this.repository.training.findMany({
      include: {
        documentsOnActivities: {
          include: {
            document: true,
          },
        },
      },
    });
  }

  async getTrainingsByEmployeeId(employeeId: string): Promise<Training[]> {
    return this.repository.training.findMany({
      where: {
        employeeId,
      },
    });
  }
}
