/*
  Warnings:

  - The primary key for the `DocumentsOnActivities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[activityId,documentId]` on the table `DocumentsOnActivities` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `DocumentsOnActivities` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "DocumentsOnActivities" DROP CONSTRAINT "DocumentsOnActivities_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DocumentsOnActivities_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "documentsOnActivitiesId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taughtBy" INTEGER,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Training_employeeId_documentsOnActivitiesId_key" ON "Training"("employeeId", "documentsOnActivitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentsOnActivities_activityId_documentId_key" ON "DocumentsOnActivities"("activityId", "documentId");

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_documentsOnActivitiesId_fkey" FOREIGN KEY ("documentsOnActivitiesId") REFERENCES "DocumentsOnActivities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
