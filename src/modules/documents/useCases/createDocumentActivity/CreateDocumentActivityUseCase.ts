import { DocumentsOnActivities } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "../../../company/activities/repositories/IActivitiesRepository";
import { GetActivityError } from "../../../company/employees/useCases/createEmployee/GetActivityError";
import { IDocumentsActivitiesRepository } from "../../repositories/IDocumentsActivitiesRepository";
import { IDocumentsRepository } from "../../repositories/IDocumentsRepository";
import { CreateDocumentActivityError } from "./CreateDocumentActivityError";
import { GetDocumentError } from "./GetDocumentError";
import { ICreateDocumentActivityDTO } from "./ICreateDocumentActivityDTO";

@injectable()
export class CreateDocumentActivityUseCase {
  constructor(
    @inject("DocumentsRepository")
    private documentsRepository: IDocumentsRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("DocumentsActivitiesRepository")
    private documentsActivitiesRepository: IDocumentsActivitiesRepository
  ) {}

  async execute({
    documentId,
    activityId,
    userId,
  }: ICreateDocumentActivityDTO): Promise<DocumentsOnActivities> {
    const documentExists = await this.documentsRepository.getDocumentById(
      documentId
    );

    if (!documentExists) {
      throw new GetDocumentError();
    }

    const activityExists = await this.activitiesRepository.getActivityById(
      activityId
    );

    if (!activityExists) {
      throw new GetActivityError();
    }

    const documentActivityAlreadyExists =
      await this.documentsActivitiesRepository.getDocumentActivity(
        documentId,
        activityId
      );

    if (documentActivityAlreadyExists) {
      throw new CreateDocumentActivityError();
    }

    const newDocumentActivity =
      await this.documentsActivitiesRepository.createDocumentActivity({
        documentId,
        activityId,
        userId,
      });

    return newDocumentActivity;
  }
}
