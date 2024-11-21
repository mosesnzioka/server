-- CreateTable
CREATE TABLE "Pool" (
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

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pool_location_idx" ON "Pool"("location");

-- CreateIndex
CREATE INDEX "Pool_day_idx" ON "Pool"("day");

-- AddForeignKey
ALTER TABLE "Pool" ADD CONSTRAINT "Pool_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
