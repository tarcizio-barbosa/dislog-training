import { inject, injectable } from "tsyringe";

import {
  DocumentCreatedData,
  IDocumentsRepository,
} from "../../repositories/IDocumentsRepository";
import { CreateDocumentError } from "./CreateDocumentError";
import { ICreateDocumentDTO } from "./ICreateDocumentDTO";

@injectable()
export class CreateDocumentUseCase {
  constructor(
    @inject("DocumentsRepository")
    private documentsRepository: IDocumentsRepository
  ) {}

  async execute({
    documentCode,
    documentName,
    documentType,
    userId,
  }: ICreateDocumentDTO): Promise<DocumentCreatedData> {
    const documentAlreadyExists =
      await this.documentsRepository.getDocumentByCode(documentCode);

    if (documentAlreadyExists) {
      throw new CreateDocumentError();
    }

    const newDocument = await this.documentsRepository.createDocument({
      documentCode,
      documentName,
      documentType,
      userId,
    });

    return newDocument;
  }
}
