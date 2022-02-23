import { DocumentsOnActivities, PrismaClient } from "@prisma/client";

import prismaClient from "../../../shared/infra/prisma/prismaClient";
import { ICreateDocumentActivityDTO } from "../useCases/createDocumentActivity/ICreateDocumentActivityDTO";
import { IDocumentsActivitiesRepository } from "./IDocumentsActivitiesRepository";

export class DocumentsActivitiesRepository
  implements IDocumentsActivitiesRepository
{
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createDocumentActivity({
    documentId,
    activityId,
    userId,
  }: ICreateDocumentActivityDTO): Promise<DocumentsOnActivities> {
    return this.repository.documentsOnActivities.create({
      data: {
        documentId,
        activityId,
        userId,
      },
    });
  }

  async getDocumentActivity(
    documentId: string,
    activityId: string
  ): Promise<DocumentsOnActivities | null> {
    return this.repository.documentsOnActivities.findUnique({
      where: {
        activityId_documentId: {
          documentId,
          activityId,
        },
      },
    });
  }
}
