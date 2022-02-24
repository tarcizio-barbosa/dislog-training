import { Training } from "@prisma/client";

import { ICreateTrainingDTO } from "../useCases/createTraining/ICreateTrainingDTO";

export interface ITrainingsRepository {
  createTraining(data: ICreateTrainingDTO): Promise<void>;
  getTraining(
    employeeId: string,
    documentsOnActivitiesId: string
  ): Promise<Training | null>;
  getAllTrainings(): Promise<Training[]>;
  getTrainingsByEmployeeId(employeeId: string): Promise<Training[]>;
}
