import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IPilarsRepository } from "../../../pilars/repositories/IPilarsRepository";
import {
  AreaCreatedData,
  IAreasRepository,
} from "../../repositories/IAreasRepository";
import { CreateAreaError } from "./CreateAreaError";
import { GetPilarError } from "./GetPilarError";
import { ICreateAreaDTO } from "./ICreateAreaDTO";

@injectable()
export class CreateAreaUseCase {
  constructor(
    @inject("AreasRepository")
    private areasRepository: IAreasRepository,
    @inject("PilarsRepository")
    private pilarsRepository: IPilarsRepository
  ) {}

  async execute({
    areaName,
    pilarId,
    userId,
  }: ICreateAreaDTO): Promise<AreaCreatedData> {
    const areaAlreadyExists = await this.areasRepository.getAreaByName(
      areaName
    );

    if (areaAlreadyExists) {
      throw new CreateAreaError();
    }

    const pilar = await this.pilarsRepository.getPilarById(pilarId);

    if (!pilar) {
      throw new GetPilarError();
    }

    const newArea = await this.areasRepository.createArea({
      areaName,
      pilarId,
      userId,
    });

    return newArea;
  }
}
