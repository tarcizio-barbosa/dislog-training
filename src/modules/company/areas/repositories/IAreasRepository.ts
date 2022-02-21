import { Area, Prisma } from "@prisma/client";

import { ICreateAreaDTO } from "../useCases/createArea/ICreateAreaDTO";

const areaCreatedData = Prisma.validator<Prisma.AreaArgs>()({
  select: {
    id: true,
    areaName: true,
    pilarId: true,
  },
});

export type AreaCreatedData = Prisma.AreaGetPayload<typeof areaCreatedData>;

export interface IAreasRepository {
  createArea(data: ICreateAreaDTO): Promise<AreaCreatedData>;
  getAreaByName(areaName: string): Promise<Area | null>;
}
