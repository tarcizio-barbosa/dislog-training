import { Activity, Prisma } from "@prisma/client";

import { ICreateActivityDTO } from "../useCases/createActivity/ICreateActivityDTO";

const activityCreatedData = Prisma.validator<Prisma.ActivityArgs>()({
  select: {
    id: true,
    activityName: true,
    areaId: true,
  },
});

export type ActivityCreatedData = Prisma.ActivityGetPayload<
  typeof activityCreatedData
>;

export interface IActivitiesRepository {
  createActivity(data: ICreateActivityDTO): Promise<ActivityCreatedData>;
  getActivityByName(activityName: string): Promise<Activity | null>;
}
