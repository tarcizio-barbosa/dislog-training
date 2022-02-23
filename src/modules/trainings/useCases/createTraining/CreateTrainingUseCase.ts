import { ICreateTrainingDTO } from "./ICreateTrainingDTO";

export class CreateTrainingUseCase {
  async execute({
    employeeId,
    documentsOnActivitiesId,
    taughtBy,
  }: ICreateTrainingDTO): Promise<void> {}
}
