/*
  Warnings:

  - Added the required column `cost` to the `pools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pools" ADD COLUMN     "cost" INTEGER NOT NULL DEFAULT 0;
