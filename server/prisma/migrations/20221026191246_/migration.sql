/*
  Warnings:

  - Made the column `userId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chatId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "chatId" SET NOT NULL;
