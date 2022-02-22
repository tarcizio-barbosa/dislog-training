import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IAreasRepository } from "../../../areas/repositories/IAreasRepository";
import {
  ActivityCreatedData,
  IActivitiesRepository,
} from "../../repositories/IActivitiesRepository";
import { CreateActivityError } from "./CreateActivityError";
import { GetAreaError } from "./GetAreaError";
import { ICreateActivityDTO } from "./ICreateActivityDTO";

@injectable()
export class CreateActivityUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("AreasRepository")
    private areasRepository: IAreasRepository
  ) {}

  async execute({
    activityName,
    areaId,
    userId,
  }: ICreateActivityDTO): Promise<ActivityCreatedData> {
    const activityAlreadyExists =
      await this.activitiesRepository.getActivityByName(activityName);

    if (activityAlreadyExists) {
      throw new CreateActivityError();
    }

    const area = await this.areasRepository.getAreaById(areaId);

    if (!area) {
      throw new GetAreaError();
    }

    const newActivity = await this.activitiesRepository.createActivity({
      activityName,
      areaId,
      userId,
    });

    return newActivity;
  }
}
