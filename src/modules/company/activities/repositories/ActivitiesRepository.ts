import { Activity, PrismaClient } from "@prisma/client";

import prismaClient from "../../../../shared/infra/prisma/prismaClient";
import { ICreateActivityDTO } from "../useCases/createActivity/ICreateActivityDTO";
import {
  ActivityCreatedData,
  IActivitiesRepository,
} from "./IActivitiesRepository";

export class ActivitiesRepository implements IActivitiesRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createActivity({
    activityName,
    areaId,
    userId,
  }: ICreateActivityDTO): Promise<ActivityCreatedData> {
    return this.repository.activity.create({
      data: {
        activityName,
        areaId,
        userId,
      },
      select: {
        id: true,
        activityName: true,
        areaId: true,
      },
    });
  }

  async getActivityByName(activityName: string): Promise<Activity | null> {
    return this.repository.activity.findUnique({
      where: {
        activityName,
      },
    });
  }

  async getActivityById(activityId: string): Promise<Activity | null> {
    return this.repository.activity.findUnique({
      where: {
        id: activityId,
      },
    });
  }
}
