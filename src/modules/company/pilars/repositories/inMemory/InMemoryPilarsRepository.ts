import { Pilar } from "@prisma/client";

import { PilarEntity } from "../../entities/PilarEntity";
import { ICreatePilarDTO } from "../../useCases/createPilar/ICreatePilarDTO";
import { IPilarsRepository, PilarCreatedData } from "../IPilarsRepository";

export class InMemoryPilarsRepository implements IPilarsRepository {
  private pilars: PilarEntity[] = [];

  async createPilar({
    pilarName,
    pilarManager,
    userId,
  }: ICreatePilarDTO): Promise<PilarCreatedData> {
    const newPilar = new PilarEntity();

    Object.assign(newPilar, {
      pilarName,
      pilarManager,
      userId,
    });

    this.pilars.push(newPilar);

    return newPilar;
  }
  async getPilarByName(pilarName: string): Promise<Pilar | null> {
    return this.pilars.find((pilar) => pilar.pilarName === pilarName);
  }
}
