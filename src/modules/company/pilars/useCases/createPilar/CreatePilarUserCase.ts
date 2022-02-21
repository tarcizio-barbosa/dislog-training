import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {
  IPilarsRepository,
  PilarCreatedData,
} from "../../repositories/IPilarsRepository";
import { CreatePilarError } from "./CreatePilarError";
import { ICreatePilarDTO } from "./ICreatePilarDTO";

@injectable()
export class CreatePilarUseCase {
  constructor(
    @inject("PilarsRepository")
    private pilarsRepository: IPilarsRepository
  ) {}

  async execute({
    pilarName,
    pilarManager,
    userId,
  }: ICreatePilarDTO): Promise<PilarCreatedData> {
    const pilarAlreadyExists = await this.pilarsRepository.getPilarByName(
      pilarName
    );

    if (pilarAlreadyExists) {
      throw new CreatePilarError();
    }

    const newPilar = await this.pilarsRepository.createPilar({
      pilarName,
      pilarManager,
      userId,
    });

    return newPilar;
  }
}
