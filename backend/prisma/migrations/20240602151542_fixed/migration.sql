/*
  Warnings:

  - You are about to drop the column `category` on the `SelectTestCategory` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `SelectTestCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SelectTestCategory" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SelectTestCategory" ADD CONSTRAINT "SelectTestCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TestCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
