import { DocumentType } from "@prisma/client";

export interface ICreateDocumentDTO {
  documentCode: string;
  documentName: string;
  documentType: DocumentType;
  userId: string;
}
