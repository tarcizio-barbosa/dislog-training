import { Training } from "@prisma/client";

import { ICreateTrainingDTO } from "../useCases/createTraining/ICreateTrainingDTO";

export interface ITrainingRepository {
  createTraining(data: ICreateTrainingDTO): Promise<Training>;
  getTraining(
    employeeId: string,
    documentsOnActivitiesId: string
  ): Promise<Training | null>;
}
