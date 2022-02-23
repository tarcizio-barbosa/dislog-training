import { Document, PrismaClient } from "@prisma/client";

import prismaClient from "../../../shared/infra/prisma/prismaClient";
import { ICreateDocumentDTO } from "../useCases/createDocument/ICreateDocumentDTO";
import {
  DocumentCreatedData,
  IDocumentsRepository,
} from "./IDocumentsRepository";

export class DocumentsRepository implements IDocumentsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async createDocument({
    documentCode,
    documentName,
    documentType,
    userId,
  }: ICreateDocumentDTO): Promise<DocumentCreatedData> {
    return this.repository.document.create({
      data: {
        documentCode,
        documentName,
        documentType,
        userId,
      },
      select: {
        id: true,
        documentCode: true,
        documentName: true,
      },
    });
  }

  async getDocumentByCode(documentCode: string): Promise<Document | null> {
    return this.repository.document.findUnique({
      where: {
        documentCode,
      },
    });
  }

  async getDocumentById(documentId: string): Promise<Document | null> {
    return this.repository.document.findUnique({
      where: {
        id: documentId,
      },
    });
  }
}
