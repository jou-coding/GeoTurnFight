-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameJa" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "isOecd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");
