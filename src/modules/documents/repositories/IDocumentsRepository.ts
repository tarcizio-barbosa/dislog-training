import { Document, Prisma } from "@prisma/client";

import { ICreateDocumentDTO } from "../useCases/createDocument/ICreateDocumentDTO";

const documentCreatedData = Prisma.validator<Prisma.DocumentArgs>()({
  select: {
    id: true,
    documentCode: true,
    documentName: true,
  },
});

export type DocumentCreatedData = Prisma.DocumentGetPayload<
  typeof documentCreatedData
>;

export interface IDocumentsRepository {
  createDocument(data: ICreateDocumentDTO): Promise<DocumentCreatedData>;
  getDocumentByCode(documentCode: string): Promise<Document | null>;
}
