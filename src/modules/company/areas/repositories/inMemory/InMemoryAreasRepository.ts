import { Area } from "@prisma/client";

import { AreaEntity } from "../../entities/AreaEntity";
import { ICreateAreaDTO } from "../../useCases/createArea/ICreateAreaDTO";
import { AreaCreatedData, IAreasRepository } from "../IAreasRepository";

export class InMemoryAreasRepository implements IAreasRepository {
  private areas: AreaEntity[] = [];

  async createArea({
    areaName,
    pilarId,
    userId,
  }: ICreateAreaDTO): Promise<AreaCreatedData> {
    const newArea = new AreaEntity();

    Object.assign(newArea, {
      areaName,
      pilarId,
      userId,
    });

    this.areas.push(newArea);

    return newArea;
  }

  async getAreaByName(areaName: string): Promise<Area | null> {
    return this.areas.find((area) => area.areaName === areaName);
  }

  async getAreaById(areaId: string): Promise<Area | null> {
    return this.areas.find((area) => area.id === areaId);
  }
}
