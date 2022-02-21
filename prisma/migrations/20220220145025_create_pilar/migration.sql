-- CreateTable
CREATE TABLE "Pilar" (
    "id" TEXT NOT NULL,
    "pilarName" VARCHAR NOT NULL,
    "pilarManager" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pilar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pilar_pilarName_key" ON "Pilar"("pilarName");

-- AddForeignKey
ALTER TABLE "Pilar" ADD CONSTRAINT "Pilar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
