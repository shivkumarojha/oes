/*
  Warnings:

  - You are about to drop the column `testName` on the `TestQuestion` table. All the data in the column will be lost.
  - Added the required column `testId` to the `TestQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestQuestion" DROP CONSTRAINT "TestQuestion_testName_fkey";

-- AlterTable
ALTER TABLE "TestQuestion" DROP COLUMN "testName",
ADD COLUMN     "testId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testId_fkey" FOREIGN KEY ("testId") REFERENCES "TestName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
