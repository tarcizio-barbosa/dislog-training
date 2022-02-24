import { DocumentsOnActivities } from "@prisma/client";

import { ICreateDocumentActivityDTO } from "../useCases/createDocumentActivity/ICreateDocumentActivityDTO";

export interface IDocumentsActivitiesRepository {
  createDocumentActivity(
    data: ICreateDocumentActivityDTO
  ): Promise<DocumentsOnActivities>;

  getDocumentActivity(
    documentId: string,
    activityId: string
  ): Promise<DocumentsOnActivities | null>;

  getDocumentsActivitiesByActivityId(
    activityId: string
  ): Promise<DocumentsOnActivities[] | null>;
}
