-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('IT', 'PROC');

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "documentCode" VARCHAR NOT NULL,
    "documentName" VARCHAR NOT NULL,
    "documentStatus" BOOLEAN NOT NULL DEFAULT true,
    "documentType" "DocumentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_documentCode_key" ON "Document"("documentCode");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
