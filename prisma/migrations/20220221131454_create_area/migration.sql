-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "areaName" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pilarId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_areaName_key" ON "Area"("areaName");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_pilarId_fkey" FOREIGN KEY ("pilarId") REFERENCES "Pilar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
