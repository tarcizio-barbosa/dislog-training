import { PrismaClient, Training } from "@prisma/client";

import prismaClient from "../../../shared/infra/prisma/prismaClient";
import { ICreateTrainingDTO } from "../useCases/createTraining/ICreateTrainingDTO";
import { ITrainingRepository } from "./ITrainingsRepository";

export class TrainingRepository implements ITrainingRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createTraining({
    employeeId,
    documentsOnActivitiesId,
    taughtBy,
  }: ICreateTrainingDTO): Promise<Training> {
    return this.repository.training.create({
      data: {
        employee: {
          connect: {
            id: employeeId,
          },
        },
        documentsOnActivities: {
          connect: {
            id: documentsOnActivitiesId,
          },
        },
        taughtBy,
      },
    });
  }

  getTraining(
    employeeId: string,
    documentsOnActivitiesId: string
  ): Promise<Training> {
    throw new Error("Method not implemented.");
  }
}
