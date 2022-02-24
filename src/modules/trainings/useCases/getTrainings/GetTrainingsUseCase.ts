import { Training } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { ITrainingsRepository } from "../../repositories/ITrainingsRepository";

@injectable()
export class GetTrainingsUseCase {
  constructor(
    @inject("TrainingsRepository")
    private trainingsRepository: ITrainingsRepository
  ) {}

  async execute(): Promise<Training[]> {
    const allTrainings = await this.trainingsRepository.getAllTrainings();

    return allTrainings;
  }
}
