/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "public_id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_public_id_key" ON "events"("public_id");
