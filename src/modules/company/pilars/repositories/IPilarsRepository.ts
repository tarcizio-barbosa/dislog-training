import { Pilar, Prisma } from "@prisma/client";

import { ICreatePilarDTO } from "../useCases/createPilar/ICreatePilarDTO";

const pilarCreatedData = Prisma.validator<Prisma.PilarArgs>()({
  select: {
    id: true,
    pilarName: true,
  },
});

export type PilarCreatedData = Prisma.PilarGetPayload<typeof pilarCreatedData>;

export interface IPilarsRepository {
  createPilar(data: ICreatePilarDTO): Promise<PilarCreatedData>;
  getPilarByName(pilarName: string): Promise<Pilar | null>;
  getPilarById(pilarId: string): Promise<Pilar | null>;
}
