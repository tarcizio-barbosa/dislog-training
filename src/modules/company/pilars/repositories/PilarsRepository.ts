import { Pilar, PrismaClient } from "@prisma/client";

import prismaClient from "../../../../shared/infra/prisma/prismaClient";
import { ICreatePilarDTO } from "../useCases/createPilar/ICreatePilarDTO";
import { IPilarsRepository, PilarCreatedData } from "./IPilarsRepository";

export class PilarsRepository implements IPilarsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createPilar({
    pilarName,
    pilarManager,
    userId,
  }: ICreatePilarDTO): Promise<PilarCreatedData> {
    return this.repository.pilar.create({
      data: {
        pilarName,
        pilarManager,
        userId,
      },
      select: {
        id: true,
        pilarName: true,
      },
    });
  }
  getPilarByName(pilarName: string): Promise<Pilar | null> {
    return this.repository.pilar.findUnique({
      where: {
        pilarName,
      },
    });
  }
}
