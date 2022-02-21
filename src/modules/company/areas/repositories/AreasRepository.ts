import { Area, PrismaClient } from "@prisma/client";

import prismaClient from "../../../../shared/infra/prisma/prismaClient";
import { ICreateAreaDTO } from "../useCases/createArea/ICreateAreaDTO";
import { AreaCreatedData, IAreasRepository } from "./IAreasRepository";

export class AreasRepository implements IAreasRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createArea({
    areaName,
    pilarId,
    userId,
  }: ICreateAreaDTO): Promise<AreaCreatedData> {
    return this.repository.area.create({
      data: {
        areaName,
        pilarId,
        userId,
      },
      select: {
        id: true,
        areaName: true,
        pilarId: true,
      },
    });
  }

  async getAreaByName(areaName: string): Promise<Area | null> {
    return this.repository.area.findUnique({
      where: {
        areaName,
      },
    });
  }
}
