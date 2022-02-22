import { Activity } from "@prisma/client";

import { ActivityEntity } from "../../entities/ActivityEntity";
import { ICreateActivityDTO } from "../../useCases/createActivity/ICreateActivityDTO";
import {
  ActivityCreatedData,
  IActivitiesRepository,
} from "../IActivitiesRepository";

export class InMemoryActivitiesRepository implements IActivitiesRepository {
  private activities: ActivityEntity[] = [];

  async createActivity({
    activityName,
    areaId,
    userId,
  }: ICreateActivityDTO): Promise<ActivityCreatedData> {
    const newActivity = new ActivityEntity();

    Object.assign(newActivity, {
      activityName,
      areaId,
      userId,
    });

    this.activities.push(newActivity);

    return newActivity;
  }

  async getActivityByName(activityName: string): Promise<Activity | null> {
    return this.activities.find(
      (activity) => activity.activityName === activityName
    );
  }

  async getActivityById(activityId: string): Promise<Activity | null> {
    return this.activities.find((activity) => activity.id === activityId);
  }
}
