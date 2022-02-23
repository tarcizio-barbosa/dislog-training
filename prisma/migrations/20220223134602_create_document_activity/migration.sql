-- CreateTable
CREATE TABLE "DocumentsOnActivities" (
    "activityId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DocumentsOnActivities_pkey" PRIMARY KEY ("activityId","documentId")
);

-- AddForeignKey
ALTER TABLE "DocumentsOnActivities" ADD CONSTRAINT "DocumentsOnActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentsOnActivities" ADD CONSTRAINT "DocumentsOnActivities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentsOnActivities" ADD CONSTRAINT "DocumentsOnActivities_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
