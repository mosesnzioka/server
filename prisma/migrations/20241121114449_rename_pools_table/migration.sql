/*
  Warnings:

  - You are about to drop the `Pool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pool" DROP CONSTRAINT "Pool_owner_fkey";

-- DropTable
DROP TABLE "Pool";

-- CreateTable
CREATE TABLE "pools" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "carType" TEXT NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "peakPoint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "pools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pools_location_idx" ON "pools"("location");

-- CreateIndex
CREATE INDEX "pools_day_idx" ON "pools"("day");

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
