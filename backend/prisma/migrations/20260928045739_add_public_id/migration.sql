/*
  Warnings:

  - You are about to drop the column `public_id` on the `events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicId]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "events_public_id_key";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "public_id",
ADD COLUMN     "publicId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_publicId_key" ON "events"("publicId");
